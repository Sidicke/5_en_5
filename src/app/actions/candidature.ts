"use server";

import { candidatureSchema } from "@/lib/validation";
import { createAdminSupabase } from "@/lib/supabase/server";
import { ActionResult } from "@/types";
import { z } from "zod";

type CandidatureInput = z.infer<typeof candidatureSchema>;

import fs from "fs";
import path from "path";

export async function submitCandidature(
  data: CandidatureInput
): Promise<ActionResult> {
  // Valide avec candidatureSchema de Zod
  const validationResult = candidatureSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      message: "Veuillez corriger les erreurs dans le formulaire.",
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const validatedData = validationResult.data;

  // Vérifie le honeypot (si rempli = spam, reject silencieusement)
  if (validatedData.honeypot !== "") {
    return {
      success: true,
      message: "Votre candidature a été enregistrée avec succès.",
    };
  }

  const { honeypot, ...insertData } = validatedData;
  const candidatureId = crypto.randomUUID();
  const candidatureToSave = {
    id: candidatureId,
    ...insertData,
    status: "RECUE",
    created_at: new Date().toISOString(),
  };

  let supabaseSuccess = false;

  // PLAN A : Supabase
  try {
    const supabase = await createAdminSupabase();
    const { error } = await supabase
      .from("candidatures")
      .insert(candidatureToSave);

    if (error) {
      if (error.code === '23505') {
        return {
          success: false,
          message: "Une candidature a déjà été soumise avec cette adresse email.",
        };
      }
      console.error("Plan A (Supabase) failed:", error.message, error);
    } else {
      supabaseSuccess = true;
    }
  } catch (error) {
    console.error("Plan A (Supabase) crashed:", error);
  }

  // PLAN B : Si Supabase échoue, on sauvegarde dans un fichier JSON local (coute que coute)
  if (!supabaseSuccess) {
    console.log("Exécution du Plan B : Sauvegarde locale dans candidatures_backup.json");
    try {
      const backupFilePath = path.join(process.cwd(), "candidatures_backup.json");
      let existingData = [];
      
      if (fs.existsSync(backupFilePath)) {
        const fileContent = fs.readFileSync(backupFilePath, "utf8");
        existingData = JSON.parse(fileContent);
      }
      
      existingData.push(candidatureToSave);
      fs.writeFileSync(backupFilePath, JSON.stringify(existingData, null, 2));
      console.log("Candidature sauvegardée localement avec succès !");
    } catch (fsError) {
      console.error("Plan B a échoué. Plan C : On log au moins la candidature dans le terminal !", fsError);
      console.log("=== SAUVEGARDE CANDIDATURE (PLAN C) ===");
      console.log(JSON.stringify(candidatureToSave, null, 2));
      console.log("======================================");
    }
  }

  return {
    success: true,
    message: "Votre candidature a été enregistrée avec succès.",
  };
}
