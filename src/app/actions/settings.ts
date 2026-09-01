"use server";

import { createAdminSupabase } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getCandidaturesStatus() {
  try {
    const supabase = await createAdminSupabase();
    const { data, error } = await supabase.from("settings").select("candidatures_ouvertes").single();
    if (error || !data) return true;
    return data.candidatures_ouvertes;
  } catch (e) {
    return true;
  }
}

export async function toggleCandidaturesStatus(status: boolean) {
  try {
    const supabase = await createAdminSupabase();
    const { error } = await supabase.from("settings").upsert({ id: 1, candidatures_ouvertes: status });
    if (error) return { success: false, message: error.message };
    revalidatePath("/admin");
    revalidatePath("/candidater");
    return { success: true };
  } catch (e: any) {
    return { success: false, message: e.message };
  }
}
