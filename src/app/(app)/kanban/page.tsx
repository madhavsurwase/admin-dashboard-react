import { PageTitle } from "@/components/PageTitle";
import { KanbanBoard } from "./components/KanbanBoard";

export default function KanbanPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.32))]"> {/* Adjust height to fit screen with header */}
      <PageTitle title="Kanban Board" />
      <KanbanBoard />
    </div>
  );
}
