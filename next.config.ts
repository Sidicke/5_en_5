import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    // Mapping the custom Vercel variables you provided to the Next.js standard
    NEXT_PUBLIC_SUPABASE_URL: process.env.SUPABASE_UR || process.env.SUPABASE_URL || "",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || "",
  }
};

export default nextConfig;
