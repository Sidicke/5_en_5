"use server";

import { createAdminSupabase } from "@/lib/supabase/server";
import { CandidatureStatus, ProjetStatus, ActionResult } from "@/types";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export async function getStats() {
  const supabase = await createAdminSupabase();
  
  const { data: candidatures, error } = await supabase
    .from("candidatures")
    .select("status");

  if (error) {
    console.error("Error fetching stats:", error);
    return { total: 0, byStatus: {} };
  }

  const byStatus = candidatures.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    total: candidatures.length,
    byStatus,
  };
}

export async function getCandidatures(
  search: string = "",
  status: string = "",
  page: number = 1
) {
  const supabase = await createAdminSupabase();
  const limit = 20;
  const offset = (page - 1) * limit;

  let query = supabase
    .from("candidatures")
    .select("*", { count: "exact" });

  if (search) {
    query = query.ilike("nom_entreprise", `%${search}%`);
  }
  
  if (status) {
    query = query.eq("status", status);
  }

  const { data, count, error } = await query
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("Error fetching candidatures:", error);
    return { data: [], count: 0 };
  }

  return { data, count: count || 0 };
}

export async function getCandidature(id: string) {
  const supabase = await createAdminSupabase();
  
  const { data: candidature, error: candidatureError } = await supabase
    .from("candidatures")
    .select("*")
    .eq("id", id)
    .single();

  if (candidatureError) return null;

  const { data: evaluation } = await supabase
    .from("evaluations")
    .select("*")
    .eq("candidature_id", id)
    .single();

  return { candidature, evaluation };
}

export async function updateCandidatureStatus(
  id: string,
  status: CandidatureStatus
): Promise<ActionResult> {
  try {
    const supabase = await createAdminSupabase();
    
    const { error } = await supabase
      .from("candidatures")
      .update({ status })
      .eq("id", id);

    if (error) throw error;
    
    revalidatePath(`/admin/candidatures`);
    revalidatePath(`/admin/candidatures/${id}`);
    
    return { success: true, message: "Statut mis à jour avec succès" };
  } catch (error) {
    console.error("Error updating status:", error);
    return { success: false, message: "Erreur lors de la mise à jour du statut" };
  }
}

export async function updateNote(
  id: string,
  note_interne: string
): Promise<ActionResult> {
  try {
    const supabase = await createAdminSupabase();
    
    const { error } = await supabase
      .from("candidatures")
      .update({ note_interne })
      .eq("id", id);

    if (error) throw error;
    
    revalidatePath(`/admin/candidatures/${id}`);
    return { success: true, message: "Note mise à jour avec succès" };
  } catch (error) {
    console.error("Error updating note:", error);
    return { success: false, message: "Erreur lors de la mise à jour de la note" };
  }
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

export async function upsertEvaluation(
  candidature_id: string,
  data: z.infer<typeof evaluationSchema>
): Promise<ActionResult> {
  try {
    const validatedData = evaluationSchema.parse(data);
    
    const score_total = 
      validatedData.besoin_reel +
      validatedData.potentiel_transformation +
      validatedData.potentiel_demonstration +
      validatedData.disponibilite +
      validatedData.clarte_besoin +
      validatedData.contenus_disponibles +
      validatedData.diversite;

    const supabase = await createAdminSupabase();
    
    const { error: evalError } = await supabase
      .from("evaluations")
      .upsert({
        candidature_id,
        ...validatedData,
        score_total,
      }, { onConflict: "candidature_id" });

    if (evalError) throw evalError;

    // Update candidature total score
    await supabase
      .from("candidatures")
      .update({ score: score_total })
      .eq("id", candidature_id);

    revalidatePath(`/admin/candidatures/${candidature_id}`);
    return { success: true, message: "Évaluation sauvegardée avec succès" };
  } catch (error) {
    console.error("Error saving evaluation:", error);
    return { success: false, message: "Erreur lors de la sauvegarde de l'évaluation" };
  }
}

export async function getProjects() {
  const supabase = await createAdminSupabase();
  const { data, error } = await supabase
    .from("projets")
    .select("*")
    .order("semaine", { ascending: true });
    
  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
  return data;
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
  try {
    const validated = projectSchema.parse(data);
    const supabase = await createAdminSupabase();
    
    const { error } = await supabase
      .from("projets")
      .insert([validated]);
      
    if (error) throw error;
    
    revalidatePath("/admin/projets");
    return { success: true, message: "Projet créé avec succès" };
  } catch (error) {
    console.error("Error creating project:", error);
    return { success: false, message: "Erreur lors de la création du projet" };
  }
}

export async function updateProject(id: string, data: any): Promise<ActionResult> {
  try {
    const validated = projectSchema.parse(data);
    const supabase = await createAdminSupabase();
    
    const { error } = await supabase
      .from("projets")
      .update(validated)
      .eq("id", id);
      
    if (error) throw error;
    
    revalidatePath("/admin/projets");
    return { success: true, message: "Projet mis à jour avec succès" };
  } catch (error) {
    console.error("Error updating project:", error);
    return { success: false, message: "Erreur lors de la mise à jour du projet" };
  }
}
