"use client";
import React, { useState } from "react";
import { Itask } from "@/types/tasks";
import Task from "./Task";

interface TodolistProps {
  tasks: Itask[];
  onToggleCompletion: (id: string, isCompleted: boolean) => void;
  onEdit: (task: Itask) => void;  
  onDelete: (id: string) => void;
}

const Todolist: React.FC<TodolistProps> = ({ tasks, onToggleCompletion, onEdit, onDelete }) => {
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

  const handleTaskClick = (id: string) => {
    setExpandedTaskId(expandedTaskId === id ? null : id); // Toggle expansion
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Tasks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  onToggleCompletion={onToggleCompletion}      
                  onEdit={onEdit}                        // to edit
                  onDelete={onDelete}                   // for deletion
                  expandedTaskId={expandedTaskId}      //for expanstion 
                  onTaskClick={handleTaskClick}        
                />
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center">
                  No tasks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Todolist;
