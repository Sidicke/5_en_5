"use server";

import { createAdminSupabase } from "@/lib/supabase/server";
import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const IS_LOCAL = process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("placeholder");
const DB_SETTINGS = path.join(process.cwd(), "settings_backup.json");

function readSettings() {
  try {
    if (fs.existsSync(DB_SETTINGS)) return JSON.parse(fs.readFileSync(DB_SETTINGS, "utf8"));
  } catch (e) {}
  return { candidatures_ouvertes: true };
}

function writeSettings(data: any) {
  fs.writeFileSync(DB_SETTINGS, JSON.stringify(data, null, 2));
}

async function assertAdmin() {
  const isDev = process.env.NODE_ENV === "development";
  const cookieStore = await cookies();
  const hasDevBypass = isDev && cookieStore.get("dev_admin_bypass")?.value === "true";
  if (hasDevBypass) return true;
  const supabase = await createAdminSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  return true;
}

export async function getCandidaturesStatus() {
  if (IS_LOCAL) {
    return readSettings().candidatures_ouvertes;
  }
  try {
    const supabase = await createAdminSupabase();
    const { data, error } = await supabase.from("settings").select("candidatures_ouvertes").single();
    if (error || !data) return true; // By default true if table missing
    return data.candidatures_ouvertes;
  } catch (e) {
    return true;
  }
}

export async function toggleCandidaturesStatus(status: boolean) {
  await assertAdmin();
  if (IS_LOCAL) {
    const settings = readSettings();
    settings.candidatures_ouvertes = status;
    writeSettings(settings);
    revalidatePath("/admin");
    revalidatePath("/candidater");
    return { success: true };
  }
  const supabase = await createAdminSupabase();
  // We assume there's only one row with id = 1
  const { error } = await supabase.from("settings").upsert({ id: 1, candidatures_ouvertes: status });
  if (error) return { success: false, message: error.message };
  revalidatePath("/admin");
  revalidatePath("/candidater");
  return { success: true };
}
