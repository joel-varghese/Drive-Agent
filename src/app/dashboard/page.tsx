import ChatBox from "@/components/ui/chatBox";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Agent Dashboard
        </h1>
        <p className="text-muted-foreground">
          Your base workspace is ready. Build your own agent workflows from here.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <ChatBox />
      </div>
    </div>
  );
}