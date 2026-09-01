import { NextResponse } from "next/server";
import { createAdminSupabase } from "@/lib/supabase/server";

export async function GET(req: Request) {
  try {
    const supabase = await createAdminSupabase();
    let query = supabase.from("candidatures").select("*", { count: "exact" }).neq("status", "ARCHIVEE");
    const { data, count, error } = await query.order("created_at", { ascending: false }).range(0, 19);
    
    return NextResponse.json({
      error: error ? error.message : null,
      data: data,
      count: count
    });
  } catch (err: any) {
    return NextResponse.json({ error: "Exception thrown", details: err.message });
  }
}
