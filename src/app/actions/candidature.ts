"use server";

import { candidatureSchema } from "@/lib/validation";
import { createAdminSupabase } from "@/lib/supabase/server";
import { ActionResult } from "@/types";
import { z } from "zod";

type CandidatureInput = z.infer<typeof candidatureSchema>;

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

  const supabase = await createAdminSupabase();

  try {
    const { error } = await supabase
      .from("candidatures")
      .insert({
        ...insertData,
        status: "RECUE",
      });

    if (error) {
      console.error("Supabase error inserting candidature:", error);
      return {
        success: false,
        message: "Une erreur est survenue lors de l'enregistrement. Veuillez réessayer plus tard.",
      };
    }

    return {
      success: true,
      message: "Votre candidature a été enregistrée avec succès.",
    };
  } catch (error) {
    console.error("Unexpected error submitting candidature:", error);
    return {
      success: false,
      message: "Une erreur inattendue est survenue. Veuillez réessayer plus tard.",
    };
  }
}
