"use server";

import { createAdminSupabase } from "@/lib/supabase/server";
import { CandidatureStatus, ProjetStatus, ActionResult } from "@/types";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import fs from 'fs';
import path from 'path';

// --- MOCK LOCAL DB LOGIC ---
const IS_LOCAL = process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("placeholder");
const DB_CANDIDATURES = path.join(process.cwd(), "candidatures_backup.json");
const DB_PROJETS = path.join(process.cwd(), "projets_backup.json");

import { cookies } from "next/headers";

async function assertAdmin() {
  const isDev = process.env.NODE_ENV === "development";
  const cookieStore = await cookies();
  const hasDevBypass = isDev && cookieStore.get("dev_admin_bypass")?.value === "true";
  
  if (hasDevBypass) return true;

  const supabase = await createAdminSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized: Admin access required.");
  return true;
}

function readLocal(file: string) {
  try {
    if (fs.existsSync(file)) return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (e) {}
  return [];
}

function writeLocal(file: string, data: any) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}
// ---------------------------

export async function getStats() {
  await assertAdmin();
  if (IS_LOCAL) {
    const candidatures = readLocal(DB_CANDIDATURES);
    const byStatus = candidatures.reduce((acc: any, curr: any) => {
      acc[curr.status] = (acc[curr.status] || 0) + 1;
      return acc;
    }, {});
    return { total: candidatures.length, byStatus };
  }

  const supabase = await createAdminSupabase();
  const { data: candidatures, error } = await supabase.from("candidatures").select("status");
  if (error) return { total: 0, byStatus: {} };
  const byStatus = candidatures.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  return { total: candidatures.length, byStatus };
}

export async function getCandidatures(search: string = "", status: string = "", page: number = 1, semaine?: number) {
  await assertAdmin();
  if (IS_LOCAL) {
    let candidatures = readLocal(DB_CANDIDATURES);
    if (search) candidatures = candidatures.filter((c: any) => c.nom_entreprise?.toLowerCase().includes(search.toLowerCase()));
    if (status) candidatures = candidatures.filter((c: any) => c.status === status);
    if (semaine !== undefined) candidatures = candidatures.filter((c: any) => c.archive_semaine === semaine);
    if (!status && semaine === undefined) candidatures = candidatures.filter((c: any) => c.status !== "ARCHIVEE");
    
    candidatures.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    const limit = 20;
    const offset = (page - 1) * limit;
    return { data: candidatures.slice(offset, offset + limit), count: candidatures.length };
  }

  const supabase = await createAdminSupabase();
  const limit = 20;
  const offset = (page - 1) * limit;
  let query = supabase.from("candidatures").select("*", { count: "exact" });
  if (search) query = query.ilike("nom_entreprise", `%${search}%`);
  if (status) query = query.eq("status", status);
  if (semaine !== undefined) query = query.eq("archive_semaine", semaine);
  if (!status && semaine === undefined) query = query.neq("status", "ARCHIVEE");
  
  const { data, count, error } = await query.order("created_at", { ascending: false }).range(offset, offset + limit - 1);
  return { data: data || [], count: count || 0 };
}

export async function getCandidature(id: string) {
  await assertAdmin();
  if (IS_LOCAL) {
    const candidatures = readLocal(DB_CANDIDATURES);
    const candidature = candidatures.find((c: any) => c.id === id) || null;
    return { candidature, evaluation: null };
  }

  const supabase = await createAdminSupabase();
  const { data: candidature } = await supabase.from("candidatures").select("*").eq("id", id).single();
  const { data: evaluation } = await supabase.from("evaluations").select("*").eq("candidature_id", id).single();
  return { candidature: candidature || null, evaluation: evaluation || null };
}

export async function updateCandidatureStatus(id: string, status: CandidatureStatus): Promise<ActionResult> {
  await assertAdmin();
  if (IS_LOCAL) {
    const candidatures = readLocal(DB_CANDIDATURES);
    const index = candidatures.findIndex((c: any) => c.id === id);
    if (index > -1) {
      candidatures[index].status = status;
      writeLocal(DB_CANDIDATURES, candidatures);
      revalidatePath(`/admin/candidatures`);
      revalidatePath(`/admin/candidatures/${id}`);
      return { success: true, message: "Statut mis à jour (Local)" };
    }
    return { success: false, message: "Non trouvé" };
  }

  const supabase = await createAdminSupabase();
  const { error } = await supabase.from("candidatures").update({ status }).eq("id", id);
  if (error) return { success: false, message: "Erreur" };
  revalidatePath(`/admin/candidatures`);
  revalidatePath(`/admin/candidatures/${id}`);
  return { success: true, message: "Statut mis à jour avec succès" };
}

export async function updateNote(id: string, note_interne: string): Promise<ActionResult> {
  await assertAdmin();
  if (IS_LOCAL) {
    const candidatures = readLocal(DB_CANDIDATURES);
    const index = candidatures.findIndex((c: any) => c.id === id);
    if (index > -1) {
      candidatures[index].note_interne = note_interne;
      writeLocal(DB_CANDIDATURES, candidatures);
      revalidatePath(`/admin/candidatures/${id}`);
      return { success: true, message: "Note mise à jour (Local)" };
    }
    return { success: false, message: "Erreur" };
  }

  const supabase = await createAdminSupabase();
  await supabase.from("candidatures").update({ note_interne }).eq("id", id);
  revalidatePath(`/admin/candidatures/${id}`);
  return { success: true, message: "Note mise à jour avec succès" };
}

const evaluationSchema = z.object({
  besoin_reel: z.number().min(0).max(20),
  potentiel_transformation: z.number().min(0).max(20),
  potentiel_demonstration: z.number().min(0).max(20),
  disponibilite: z.number().min(0).max(15),
  clarte_besoin: z.number().min(0).max(10),
  contenus_disponibles: z.number().min(0).max(10),
  diversite: z.number().min(0).max(5),
  commentaire: z.string().optional(),
});

export async function upsertEvaluation(candidature_id: string, data: z.infer<typeof evaluationSchema>): Promise<ActionResult> {
  await assertAdmin();
  return { success: true, message: "Évaluation sauvegardée (Simulé en local)" };
}

export async function getProjects() {
  if (IS_LOCAL) return readLocal(DB_PROJETS);
  const supabase = await createAdminSupabase();
  const { data } = await supabase.from("projets").select("*").order("semaine", { ascending: true });
  return data || [];
}

const projectSchema = z.object({
  candidature_id: z.string(),
  entreprise: z.string(),
  secteur: z.string(),
  semaine: z.number().min(1).max(5),
  status: z.enum(["EN_ATTENTE", "EN_COURS", "TERMINE", "LIVRE", "ANNULE"]),
  description: z.string(),
  image_url: z.string().optional().nullable(),
  site_url: z.string().optional().nullable(),
  description_avant: z.string().optional().nullable(),
  description_apres: z.string().optional().nullable(),
});

export async function createProject(data: any): Promise<ActionResult> {
  await assertAdmin();
  if (IS_LOCAL) {
    const projets = readLocal(DB_PROJETS);
    projets.push({ id: crypto.randomUUID(), ...data, created_at: new Date().toISOString() });
    writeLocal(DB_PROJETS, projets);
    revalidatePath("/admin/projets");
    return { success: true, message: "Projet créé (Local)" };
  }
  const supabase = await createAdminSupabase();
  await supabase.from("projets").insert([data]);
  revalidatePath("/admin/projets");
  return { success: true, message: "Projet créé avec succès" };
}

export async function updateProject(id: string, data: any): Promise<ActionResult> {
  await assertAdmin();
  if (IS_LOCAL) {
    const projets = readLocal(DB_PROJETS);
    const index = projets.findIndex((p: any) => p.id === id);
    if (index > -1) {
      projets[index] = { ...projets[index], ...data };
      writeLocal(DB_PROJETS, projets);
      revalidatePath("/admin/projets");
      return { success: true, message: "Projet mis à jour (Local)" };
    }
    return { success: false, message: "Erreur" };
  }
  const supabase = await createAdminSupabase();
  await supabase.from("projets").update(data).eq("id", id);
  revalidatePath("/admin/projets");
  return { success: true, message: "Projet mis à jour avec succès" };
}

export async function deleteProject(id: string): Promise<ActionResult> {
  await assertAdmin();
  if (IS_LOCAL) {
    let projets = readLocal(DB_PROJETS);
    projets = projets.filter((p: any) => p.id !== id);
    writeLocal(DB_PROJETS, projets);
    revalidatePath("/admin/projets");
    return { success: true, message: "Projet supprimé (Local)" };
  }
  const supabase = await createAdminSupabase();
  const { error } = await supabase.from("projets").delete().eq("id", id);
  if (error) return { success: false, message: "Erreur lors de la suppression" };
  revalidatePath("/admin/projets");
  return { success: true, message: "Projet supprimé avec succès" };
}

export async function archiveAllCandidatures(semaine: number) {
  await assertAdmin();
  const { getCandidaturesStatus } = await import("./settings");
  const isOpen = await getCandidaturesStatus();
  
  if (isOpen) {
    return { success: false, message: "Vous devez d'abord bloquer les candidatures avant d'archiver." };
  }

  if (IS_LOCAL) {
    const candidatures = readLocal(DB_CANDIDATURES);
    let updatedCount = 0;
    const updated = candidatures.map((c: any) => {
      if (c.status !== "ARCHIVEE") {
        updatedCount++;
        return { ...c, status: "ARCHIVEE", archive_semaine: semaine };
      }
      return c;
    });
    if (updatedCount === 0) return { success: false, message: "Aucune candidature à archiver." };
    writeLocal(DB_CANDIDATURES, updated);
    revalidatePath("/admin/candidatures");
    revalidatePath("/admin");
    return { success: true, message: `${updatedCount} candidatures archivées pour la semaine ${semaine}.` };
  }

  const supabase = await createAdminSupabase();
  const { data, error } = await supabase
    .from("candidatures")
    .update({ status: "ARCHIVEE", archive_semaine: semaine })
    .neq("status", "ARCHIVEE")
    .select("id");

  if (error) return { success: false, message: error.message };
  if (!data || data.length === 0) return { success: false, message: "Aucune candidature à archiver." };

  revalidatePath("/admin/candidatures");
  revalidatePath("/admin");
  return { success: true, message: `${data.length} candidatures archivées pour la semaine ${semaine}.` };
}

export async function getArchiveWeeks() {
  await assertAdmin();
  if (IS_LOCAL) {
    const candidatures = readLocal(DB_CANDIDATURES);
    const weeks = new Set<number>();
    candidatures.forEach((c: any) => {
      if (c.status === "ARCHIVEE" && c.archive_semaine) {
        weeks.add(c.archive_semaine);
      }
    });
    return Array.from(weeks).sort((a, b) => b - a);
  }

  const supabase = await createAdminSupabase();
  // Group by doesn't exist out of the box without RPC, so we just fetch all archive_semaines and deduplicate
  // In production for huge datasets an RPC is better, but this is fine for this scale
  const { data, error } = await supabase
    .from("candidatures")
    .select("archive_semaine")
    .eq("status", "ARCHIVEE")
    .not("archive_semaine", "is", null);

  if (error || !data) return [];
  const weeks = new Set<number>();
  data.forEach((r: any) => weeks.add(r.archive_semaine));
  return Array.from(weeks).sort((a, b) => b - a);
}
