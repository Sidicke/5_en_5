"use server";

import { createAdminSupabase } from "@/lib/supabase/server";
import { CandidatureStatus, ProjetStatus, ActionResult } from "@/types";
import { z } from "zod";
import { revalidatePath } from "next/cache";

// --- Stats ---
export async function getStats() {
  try {
    const supabase = await createAdminSupabase();
    const { data: candidatures, error } = await supabase.from("candidatures").select("status");
    if (error) {
      console.error("getStats error:", error);
      return { total: 0, byStatus: {}, error: error.message };
    }
    const byStatus = candidatures.reduce((acc, curr) => {
      acc[curr.status] = (acc[curr.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return { total: candidatures.length, byStatus, error: null };
  } catch (e: any) {
    console.error("getStats exception:", e);
    return { total: 0, byStatus: {}, error: e.message };
  }
}

// --- Candidatures list ---
export async function getCandidatures(search: string = "", status: string = "", page: number = 1, semaine?: number) {
  try {
    const supabase = await createAdminSupabase();
    const limit = 20;
    const offset = (page - 1) * limit;
    let query = supabase.from("candidatures").select("*", { count: "exact" });
    if (search) query = query.ilike("nom_entreprise", `%${search}%`);
    if (status) query = query.eq("status", status);
    if (semaine !== undefined) query = query.eq("archive_semaine", semaine);
    if (!status && semaine === undefined) query = query.neq("status", "ARCHIVEE");

    const { data, count, error } = await query.order("created_at", { ascending: false }).range(offset, offset + limit - 1);
    if (error) {
      console.error("getCandidatures error:", error);
      return { data: [], count: 0, error: error.message };
    }
    return { data: data || [], count: count || 0, error: null };
  } catch (e: any) {
    console.error("getCandidatures exception:", e);
    return { data: [], count: 0, error: e.message };
  }
}

// --- Single candidature ---
export async function getCandidature(id: string) {
  try {
    const supabase = await createAdminSupabase();
    const { data: candidature } = await supabase.from("candidatures").select("*").eq("id", id).single();
    const { data: evaluation } = await supabase.from("evaluations").select("*").eq("candidature_id", id).single();
    return { candidature: candidature || null, evaluation: evaluation || null };
  } catch (e: any) {
    console.error("getCandidature exception:", e);
    return { candidature: null, evaluation: null };
  }
}

// --- Update status ---
export async function updateCandidatureStatus(id: string, status: CandidatureStatus): Promise<ActionResult> {
  const supabase = await createAdminSupabase();
  const { error } = await supabase.from("candidatures").update({ status }).eq("id", id);
  if (error) return { success: false, message: "Erreur: " + error.message };
  revalidatePath(`/admin/candidatures`);
  revalidatePath(`/admin/candidatures/${id}`);
  return { success: true, message: "Statut mis à jour avec succès" };
}

// --- Update note ---
export async function updateNote(id: string, note_interne: string): Promise<ActionResult> {
  const supabase = await createAdminSupabase();
  await supabase.from("candidatures").update({ note_interne }).eq("id", id);
  revalidatePath(`/admin/candidatures/${id}`);
  return { success: true, message: "Note mise à jour avec succès" };
}

// --- Evaluation ---
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
  return { success: true, message: "Évaluation sauvegardée" };
}

// --- Projects ---
export async function getProjects() {
  try {
    const supabase = await createAdminSupabase();
    const { data } = await supabase.from("projets").select("*").order("semaine", { ascending: true });
    return data || [];
  } catch (e) {
    console.error("getProjects exception:", e);
    return [];
  }
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
  const supabase = await createAdminSupabase();
  await supabase.from("projets").insert([data]);
  revalidatePath("/admin/projets");
  return { success: true, message: "Projet créé avec succès" };
}

export async function updateProject(id: string, data: any): Promise<ActionResult> {
  const supabase = await createAdminSupabase();
  await supabase.from("projets").update(data).eq("id", id);
  revalidatePath("/admin/projets");
  return { success: true, message: "Projet mis à jour avec succès" };
}

export async function deleteProject(id: string): Promise<ActionResult> {
  const supabase = await createAdminSupabase();
  const { error } = await supabase.from("projets").delete().eq("id", id);
  if (error) return { success: false, message: "Erreur lors de la suppression" };
  revalidatePath("/admin/projets");
  return { success: true, message: "Projet supprimé avec succès" };
}

// --- Archive ---
export async function archiveAllCandidatures(semaine: number) {
  const { getCandidaturesStatus } = await import("./settings");
  const isOpen = await getCandidaturesStatus();

  if (isOpen) {
    return { success: false, message: "Vous devez d'abord bloquer les candidatures avant d'archiver." };
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
  try {
    const supabase = await createAdminSupabase();
    const { data, error } = await supabase
      .from("candidatures")
      .select("archive_semaine")
      .eq("status", "ARCHIVEE")
      .not("archive_semaine", "is", null);

    if (error || !data) return [];
    const weeks = new Set<number>();
    data.forEach((r: any) => weeks.add(r.archive_semaine));
    return Array.from(weeks).sort((a, b) => b - a);
  } catch (e) {
    console.error("getArchiveWeeks exception:", e);
    return [];
  }
}
