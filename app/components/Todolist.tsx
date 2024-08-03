import { Itask } from "@/types/tasks";
import Task from "./Task";
import React from "react";

interface TodolistProps {
  tasks: Itask[];
}

const Todolist: React.FC<TodolistProps> = ({ tasks }) => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Tasks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Todolist;
