// components/Task.tsx
import React from "react";
import { Itask } from "@/types/tasks";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"; // Import icons for edit and delete

interface TaskProps {
  task: Itask;
  onToggleCompletion: (id: string, isCompleted: boolean) => void;
  onEdit: (task: Itask) => void;
  onDelete: (id: string) => void;
  expandedTaskId: string | null; // Track which task is expanded
  onTaskClick: (id: string) => void; // Handle task click to toggle expansion
}

const Task: React.FC<TaskProps> = ({
  task,
  onToggleCompletion,
  onEdit,
  onDelete,
  expandedTaskId,
  onTaskClick
}) => {
  const handleTaskClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering onCheckboxChange
    onTaskClick(task.id);
  };

  const handleCheckboxClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering onTaskClick
    onToggleCompletion(task.id, task.isCompleted);
  };

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering onTaskClick
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (confirmed) {
      onDelete(task.id);
    }
  };

  return (
    <>
      <tr onClick={handleTaskClick} className="cursor-pointer">
        <td>{task.text}</td>
        <td>
          <input
            type="checkbox"
            readOnly={task.isCompleted}
            onClick={handleCheckboxClick}
          />
          <button 
            onClick={(e) => { e.stopPropagation(); onEdit(task); }}
            className="ml-2 text-blue-500"
            aria-label="Edit"
          >
            <AiOutlineEdit size={20} />
          </button>
          <button 
            onClick={handleDeleteClick}
            className="ml-2 text-red-500"
            aria-label="Delete"
          >
            <AiOutlineDelete size={20} />
          </button>
        </td>
      </tr>
      {expandedTaskId === task.id && (
        <tr>
          <td colSpan={2}>
            <div className="p-2 border-t">
              <p><strong>Description:</strong> {task.description || "No description available"}</p> 
              <p><strong>Last Updated:</strong> {task.lastUpdated || "No timestamp available"}</p>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default Task;
