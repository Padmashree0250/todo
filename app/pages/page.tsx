import { Itask } from "@/types/tasks";

// Base URL for the API
const baseURL = "http://localhost:3001";

// Fetch tasks based on a search query
export const searchTodos = async (query: string): Promise<Itask[]> => {
  const response = await fetch(
    `${baseURL}/tasks/search?query=${encodeURIComponent(query)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const tasks: Itask[] = await response.json();
  return tasks;
};

// Fetching all tasks
export const getAlLTodos = async (): Promise<Itask[]> => {
  const response = await fetch(`${baseURL}/tasks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const todos: Itask[] = await response.json();
  return todos;
};

// Adding a new task
export const addTodo = async (todo: Itask): Promise<Itask> => {
  const res = await fetch(`${baseURL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!res.ok) {
    throw new Error("Failed to add task");
  }

  const newTodo: Itask = await res.json();
  return newTodo;
};

// Editing an existing task
export const editTodo = async (todo: Itask): Promise<Itask> => {
  const res = await fetch(`${baseURL}/tasks/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!res.ok) {
    throw new Error("Failed to edit task");
  }

  const updatedTodo: Itask = await res.json();
  return updatedTodo;
};

// Deleting a task
export const deleteTodo = async (id: string): Promise<void> => {
  const res = await fetch(`${baseURL}/tasks/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete task");
  }
};

// Toggle the completion status of a task
export const toggleTodoCompletion = async (
  id: string,
  isCompleted: boolean
): Promise<Itask> => {
  const res = await fetch(`${baseURL}/tasks/${id}`, {
    method: "PATCH", // Using PATCH for partial updates
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isCompleted: !isCompleted }), // Toggle completion status
  });

  if (!res.ok) {
    throw new Error("Failed to toggle task completion");
  }

  const updatedTodo: Itask = await res.json();
  return updatedTodo;
};
