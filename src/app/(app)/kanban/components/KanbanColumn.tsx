"use client";

import type { KanbanTask, KanbanColumn as KanbanColumnType } from "@/lib/types";
import { KanbanCard } from "./KanbanCard";
import { Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface KanbanColumnProps {
  column: KanbanColumnType;
  tasks: KanbanTask[];
  draggingTaskId: string | null;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, taskId: string) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, columnId: string) => void;
  onAddTask: (columnId: string) => void;
}

export function KanbanColumn({
  column,
  tasks,
  draggingTaskId,
  onDragStart,
  onDragOver,
  onDrop,
  onAddTask,
}: KanbanColumnProps) {
  return (
    <Card
      className="w-80 min-w-80 flex flex-col bg-muted/50 rounded-lg shadow-md"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, column.id)}
      aria-label={`${column.title} column`}
    >
      <CardHeader className="p-4 border-b flex flex-row justify-between items-center">
        <CardTitle className="text-lg font-semibold font-headline">{column.title} ({tasks.length})</CardTitle>
        <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => onAddTask(column.id)} aria-label={`Add task to ${column.title}`}>
              <Plus className="h-5 w-5" />
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label={`Column options for ${column.title}`}>
                        <MoreHorizontal className="h-5 w-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>Rename Column</DropdownMenuItem>
                    <DropdownMenuItem>Clear All Tasks</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Delete Column</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </CardHeader>
      <ScrollArea className="flex-1">
        <CardContent className="p-4 h-[calc(100vh-20rem)]"> {/* Adjust height as needed */}
          {tasks.map((task) => (
            <KanbanCard
              key={task.id}
              task={task}
              isDragging={draggingTaskId === task.id}
              onDragStart={onDragStart}
            />
          ))}
          {tasks.length === 0 && (
            <div className="text-center text-sm text-muted-foreground py-4">
              No tasks in this column.
            </div>
          )}
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
