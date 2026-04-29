import Link from "next/link";
import { InteractiveDotBackground } from "@/components/ui/interactive-dot-background";

const platforms = [
  { name: "Email", icon: "E", color: "bg-[#334155]" },
  { name: "Drive", icon: "D", color: "bg-[#2563EB]" },
  { name: "Docs", icon: "O", color: "bg-[#16A34A]" },
  { name: "Calendar", icon: "C", color: "bg-[#DC2626]" },
  { name: "Tasks", icon: "T", color: "bg-[#7C3AED]" },
];

const capabilities = [
  {
    title: "Write & ship code",
    description:
      "Build automation agents that can reason through workflows and complete tasks from natural language prompts.",
  },
  {
    title: "Manage communication",
    description:
      "Drafts and sends emails, organizes follow-ups, and tracks outcomes without manual busy work.",
  },
  {
    title: "Work with cloud docs",
    description:
      "Search files, pull context from documents, and help users retrieve what they need in seconds.",
  },
  {
    title: "Calendar orchestration",
    description:
      "Generate invites, coordinate availability, and keep schedules synced automatically.",
  },
  {
    title: "Extensible architecture",
    description:
      "Start with a minimal foundation and add tools, connectors, and custom pipelines over time.",
  },
  {
    title: "Operational visibility",
    description:
      "Track your automation runtime and iterate safely as your agentic system grows.",
  },
];

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#06080f] text-white">
      <InteractiveDotBackground />
      <div className="pointer-events-none fixed inset-y-0 left-1/2 z-0 w-full max-w-5xl -translate-x-1/2 bg-[#06080f]" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(56,78,132,0.2),transparent_55%)]" />
      {/* Nav */}
      <header className="relative z-10 border-b border-white/10">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <span className="text-lg font-bold">Rendezvous</span>
          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/dashboard"
              className="rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 pt-24 pb-16 text-center">
        <div className="flex items-center gap-2 mb-6">
          {platforms.map((p) => (
            <span
              key={p.name}
              className={`${p.color} inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white`}
              title={p.name}
            >
              {p.icon}
            </span>
          ))}
        </div>
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
          Cloud assistance on the go,
          <br />
          <span className="text-muted-foreground">for optimum scheduling.</span>
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          Agentic system that automates busy work such as sending emails, generating calender invites and searching cloud spaces with ease.
        </p>
        <div className="mt-8 flex gap-3">
          <Link
            href="/dashboard"
            className="rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Open Dashboard
          </Link>
          <a
            href="https://github.com/joel-varghese/Drive-Agent"
            target="_blank"
            rel="noopener noreferrer"
              className="rounded-md border border-white/30 px-6 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
          >
            View Source
          </a>
        </div>
      </section>

      {/* How it works */}
      <section className="relative z-10 border-t border-white/10 bg-white/5">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <h2 className="text-center text-2xl font-bold tracking-tight mb-2">
            How it works
          </h2>
          <p className="text-center text-muted-foreground mb-10">
            One control plane for your own integrations.
          </p>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
            <Step number="1" title="Define tasks" description="Describe the workflows you want to automate and connect your required tools." />
            <Step number="2" title="Run agent logic" description="Your agent reads context, chooses actions, and executes APIs or tool calls." />
            <Step number="3" title="Review outcomes" description="Monitor outputs in the dashboard, then iterate on prompts and orchestration." />
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="relative z-10 mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-center text-2xl font-bold tracking-tight mb-2">
          What this starter supports
        </h2>
        <p className="text-center text-muted-foreground mb-10">
          Ready for your custom integrations and auth setup.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="rounded-lg border border-border bg-card p-5"
            >
              <h3 className="text-sm font-semibold mb-1">{cap.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-2">
            Get started
          </h2>
          <p className="text-muted-foreground mb-6">
            Sign in, wire your services, and start building.
          </p>
          <div className="flex justify-center gap-3">
            <Link
              href="/sign-in"
              className="rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Sign in
            </Link>
            <a
              href="https://github.com/joel-varghese/Drive-Agent"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-white/30 px-6 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 text-xs text-muted-foreground">
          <span>Rendezvous</span>
          <span>Built with Next.js and Supabase</span>
        </div>
      </footer>
    </div>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-card p-6">
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs font-bold font-mono">
        {number}
      </span>
      <h3 className="mt-3 text-sm font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}