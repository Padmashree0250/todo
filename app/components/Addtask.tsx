"use client";

import { AiOutlinePlus } from "react-icons/ai"; //icons
import Modal from "./model";
import { FormEventHandler, useState, useEffect } from "react";
import {
  addTodo,
  getAlLTodos,
  toggleTodoCompletion,
  editTodo,
  deleteTodo,
} from "../pages/page"; //api 
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid"; //unique id for task
import { Itask } from "@/types/tasks"; //data 
import Todolist from "./Todolist";

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");
  const [newTaskDescription, setNewTaskDescription] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [tasks, setTasks] = useState<Itask[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Itask[]>([]);
  const [editingTask, setEditingTask] = useState<Itask | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getAlLTodos();
        setTasks(fetchedTasks);
        setFilteredTasks(fetchedTasks); // Initialize filteredTasks with all tasks for search
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {      //adding new task
    e.preventDefault();
    const newTask: Itask = {
      id: uuidv4(),
      text: newTaskValue,
      isCompleted: false,
      description: newTaskDescription,
      lastUpdated: new Date().toISOString(),
    };

    try {
      if (editingTask) {
        await editTodo({
          ...editingTask,
          text: newTaskValue,
          description: newTaskDescription,                      // adding description after editing
          lastUpdated: new Date().toISOString(),                //time stamp of last update
        });
        const updatedTasks = tasks.map((task) =>
          task.id === editingTask.id
            ? {
                ...task,
                text: newTaskValue,
                description: newTaskDescription,
                lastUpdated: new Date().toISOString(),
              }
            : task
        );
        setTasks(updatedTasks);
        setFilteredTasks(updatedTasks);
      } else {
        await addTodo(newTask);
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        setFilteredTasks(updatedTasks);
      }

      setNewTaskValue("");                          
      setNewTaskDescription("");                       
      setModalOpen(false);
      setEditingTask(null);
      router.refresh();
    } catch (error) {
      console.error("Failed to save task:", error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterTasks(query, tasks);                      //searching the task
  };

  const filterTasks = (query: string, tasks: Itask[]) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = tasks.filter((task) =>
      task.text.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredTasks(filtered);
  };

  const handleToggleCompletion = async (id: string, isCompleted: boolean) => {
    try {
      await toggleTodoCompletion(id, isCompleted);
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !isCompleted } : task
      );
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
    } catch (error) {
      console.error("Failed to toggle task completion:", error);
    }
  };

  const handleEdit = (task: Itask) => {
    setEditingTask(task);
    setNewTaskValue(task.text);
    setNewTaskDescription(task.description || "");
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <div>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search tasks..."
          className="input input-bordered w-full"
          value={searchQuery}
          onChange={handleSearch}
        />
        <button
          onClick={() => {
            setEditingTask(null);
            setNewTaskValue("");
            setNewTaskDescription("");
            setModalOpen(true);
          }}
          className="btn btn-primary ml-2"
        >
          Add new Task <AiOutlinePlus className="ml-2" size={18} />
        </button>
      </div>

      <Todolist
        tasks={filteredTasks}
        onToggleCompletion={handleToggleCompletion}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal modalOpen={modalOpen} setModelOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className="font-bold text-lg">
            {editingTask ? "Edit Task" : "Add New Task"}
          </h3>
          <div className="modal-action">
            <input
              value={newTaskValue}
              onChange={(e) => setNewTaskValue(e.target.value)}
              type="text"
              placeholder="Task Title"
              className="input input-bordered w-full"                            //setting task
            />
            <textarea
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}                  //setting description while adding task
              placeholder="Task Description"
              className="input input-bordered w-full mt-2"
            />
            <button type="submit" className="btn mt-2">                          //submitting task and description
              {editingTask ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
