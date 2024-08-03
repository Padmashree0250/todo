import { Itask } from "./types/tasks";

const baseURL = "http://localhost:3001";
export const getAlLTodos = async (): Promise<Itask[]> => {
  const response = await fetch(`${baseURL}/tasks`, { cache: "no-store" });
  const todos = await response.json();
  return todos;
};

export const addTodo = async (todo: Itask): Promise<Itask[]> => {
  const res = await fetch(`${baseURL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const newTodo = await res.json();
  return newTodo;
};
export const editTodo = async (todo: Itask): Promise<Itask[]> => {
  const res = await fetch(`${baseURL}/tasks/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const updatedTodo = await res.json();
  return updatedTodo;
};
export const deleteTodo = async (id: string): Promise<void> => {
  await fetch(`${baseURL}/tasks/${id}`, {
    method: "DELETE",
  });
};
