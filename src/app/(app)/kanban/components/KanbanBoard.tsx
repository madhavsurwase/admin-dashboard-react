"use client";

import React, { useState, useEffect } from "react";
import type { KanbanTask, KanbanColumn as KanbanColumnType } from "@/lib/types";
import { initialKanbanTasks, initialKanbanColumns } from "@/lib/data";
import { KanbanColumn } from "./KanbanColumn";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Helper function to reorder tasks within the same column
const reorder = (list: KanbanTask[], startIndex: number, endIndex: number): KanbanTask[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

// Helper function to move a task from one column to another
const move = (
  source: KanbanTask[],
  destination: KanbanTask[],
  droppableSource: { index: number; droppableId: string },
  droppableDestination: { index: number; droppableId: string }
): { [key: string]: KanbanTask[] } => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: { [key: string]: KanbanTask[] } = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};


export function KanbanBoard() {
  const [tasks, setTasks] = useState<Record<string, KanbanTask[]>>({});
  const [columns, setColumns] = useState<KanbanColumnType[]>(initialKanbanColumns);
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize tasks grouped by column ID
    const initialTasksByColumn: Record<string, KanbanTask[]> = {};
    initialKanbanColumns.forEach(column => {
      initialTasksByColumn[column.id] = initialKanbanTasks.filter(task => task.status === column.id);
    });
    setTasks(initialTasksByColumn);
  }, []);
  
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, taskId: string) => {
    setDraggingTaskId(taskId);
    e.dataTransfer.setData("taskId", taskId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); 
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetColumnId: string) => {
    e.preventDefault();
    if (!draggingTaskId) return;

    const sourceTask = initialKanbanTasks.find(t => t.id === draggingTaskId);
    if (!sourceTask) return;

    const sourceColumnId = sourceTask.status;

    setTasks(prevTasks => {
      const newTasks = { ...prevTasks };
      
      // Remove task from source column
      newTasks[sourceColumnId] = newTasks[sourceColumnId].filter(task => task.id !== draggingTaskId);
      
      // Add task to target column
      const updatedTask = { ...sourceTask, status: targetColumnId };
      newTasks[targetColumnId] = [...(newTasks[targetColumnId] || []), updatedTask];

      // Update the main task list to reflect status change for persistence (if any)
      const taskIndex = initialKanbanTasks.findIndex(t => t.id === draggingTaskId);
      if(taskIndex !== -1) {
        initialKanbanTasks[taskIndex] = updatedTask;
      }

      return newTasks;
    });

    setDraggingTaskId(null);
    toast({ title: "Task Moved", description: `Task "${sourceTask.title}" moved to ${columns.find(c => c.id === targetColumnId)?.title}.` });
  };
  
  const handleAddTask = (columnId: string) => {
    const newTaskTitle = prompt("Enter new task title:");
    if (newTaskTitle) {
      const newTask: KanbanTask = {
        id: `task-${Date.now()}`,
        title: newTaskTitle,
        status: columnId,
      };
      // Add to global list
      initialKanbanTasks.push(newTask);
      // Update local state
      setTasks(prevTasks => ({
        ...prevTasks,
        [columnId]: [...(prevTasks[columnId] || []), newTask],
      }));
      toast({ title: "Task Added", description: `New task "${newTaskTitle}" added to ${columns.find(c => c.id === columnId)?.title}.` });
    }
  };

  const handleAddColumn = () => {
    const newColumnTitle = prompt("Enter new column title:");
    if (newColumnTitle) {
      const newColumnId = newColumnTitle.toLowerCase().replace(/\s+/g, '-');
      const newColumn: KanbanColumnType = {
        id: newColumnId,
        title: newColumnTitle,
        taskIds: [],
      };
      setColumns(prev => [...prev, newColumn]);
      setTasks(prev => ({ ...prev, [newColumnId]: [] }));
      toast({ title: "Column Added", description: `New column "${newColumnTitle}" added.` });
    }
  };


  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-end mb-4">
        <Button onClick={handleAddColumn} variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Add New Column
        </Button>
      </div>
      <div className="flex-1 flex gap-6 overflow-x-auto pb-4">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={tasks[column.id] || []}
            draggingTaskId={draggingTaskId}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onAddTask={handleAddTask}
          />
        ))}
      </div>
    </div>
  );
}
