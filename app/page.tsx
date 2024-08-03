import { getAlLTodos } from "@/api";
import Addtask from "./components/Addtask";
import Todolist from "./components/Todolist";

export default async  function Home() {
  const tasks =await getAlLTodos();
  console.log(tasks);
  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">todo list app</h1>
        <Addtask />
      </div>
      <Todolist tasks={tasks}/>

    </main>
  );
}
