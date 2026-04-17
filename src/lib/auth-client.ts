"use client";

import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase env vars missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
  );
}

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

export async function signInWithProvider(
  provider: "github" | "google",
  redirectTo: string,
) {
  return supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo },
  });
}

export async function signOut() {
  return supabase.auth.signOut();
}