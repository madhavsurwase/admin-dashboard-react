"use client";

import type { KanbanTask } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface KanbanCardProps {
  task: KanbanTask;
  isDragging: boolean;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, taskId: string) => void;
}

export function KanbanCard({ task, isDragging, onDragStart }: KanbanCardProps) {
  return (
    <Card
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      className={`mb-3 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-grab ${
        isDragging ? "opacity-50 ring-2 ring-primary" : "bg-card"
      }`}
      aria-grabbed={isDragging}
    >
      <CardHeader className="p-0 mb-2 flex flex-row justify-between items-start">
        <CardTitle className="text-base font-semibold">{task.title}</CardTitle>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit Task</DropdownMenuItem>
                <DropdownMenuItem>Change Priority</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Delete Task</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      {task.description && (
        <CardContent className="p-0 mb-2">
          <CardDescription className="text-sm">{task.description}</CardDescription>
        </CardContent>
      )}
      <CardFooter className="p-0 flex justify-between items-center">
        {task.priority && (
          <Badge
            variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'secondary' : 'outline'}
            className="text-xs"
          >
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </Badge>
        )}
        {task.dueDate && (
          <div className="flex items-center text-xs text-muted-foreground">
            <CalendarIcon className="h-3 w-3 mr-1" />
            {new Date(task.dueDate).toLocaleDateString()}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
