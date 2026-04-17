import Link from "next/link";
import { getServerSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { UserNav } from "@/components/dashboard/user-nav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getServerSession();
  if (!user) redirect("/sign-in");

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-lg font-bold">
              Rendezvous
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link
                href="/dashboard"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Overview
              </Link>
            </nav>
          </div>
          <UserNav
            name={user.user_metadata?.name ?? user.email ?? "User"}
            email={user.email ?? ""}
            image={user.user_metadata?.avatar_url}
            role="user"
          />
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6">
        {children}
      </main>
    </div>
  );
}