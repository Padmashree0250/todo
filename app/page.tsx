import { getAlLTodos } from "@/api";
import Addtask from "./components/Addtask";
import Todolist from "./components/Todolist";

const Page = () => {
  return (
    <div className="bg-blue-50 min-h-screen p-4">
      <header className="bg-blue-600 text-white py-4 mb-4 text-center text-2xl font-bold">
        Todo List App
      </header>
      {/* Add your content here */}
      <Addtask />
      {/* Assuming you have tasks passed as props */}
      {/* <Todolist tasks={tasks} onToggleCompletion={handleToggleCompletion} onEdit={handleEdit} onDelete={handleDelete} /> */}
    </div>
  );
};

export default Page;
