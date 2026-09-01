import { NextResponse } from "next/server";
import { createAdminSupabase } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createAdminSupabase();
    
    // Test the Service Role Key Query
    const { data, error } = await supabase.from("candidatures").select("*").limit(5);

    return NextResponse.json({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_UR || "NOT_SET",
      hasAnonKey: !!(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY),
      hasServiceRoleKey: !!(process.env.SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY),
      error: error ? error : null,
      data: data ? data : null,
    });
  } catch (err: any) {
    return NextResponse.json({ error: "Exception thrown", details: err.message });
  }
}
