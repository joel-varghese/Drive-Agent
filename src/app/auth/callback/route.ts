import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {

  console.log("=== CALLBACK HIT ===");
  const requestUrl = new URL(request.url);

  console.log("full url:", request.url);

  const code = requestUrl.searchParams.get("code");
  
  console.log("code exists:", !!code);
  const next = requestUrl.searchParams.get("next") ?? "/dashboard";

  console.log("next:", next);

  const response = NextResponse.redirect(
    new URL(next, requestUrl.origin),
  );

  if (code) {
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {

            console.log(
              "setting cookies:",
              cookiesToSet.map((c) => c.name),
            );

            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
          },
        },
      },
    );
    const { data, error} = await supabase.auth.exchangeCodeForSession(code);
    
    console.log("exchange error:", error);

    console.log(
      "session user:",
      data?.user?.email,
    );
  }

  console.log("=== CALLBACK END ===")
  return response;
}
