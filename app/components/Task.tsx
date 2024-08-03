"use client";
import { Itask } from "@/types/tasks";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { FiTrash } from "react-icons/fi";
import Modal from "./model";
import { FormEventHandler } from "react";
import { useRouter } from "next/navigation";
import { editTodo } from "@/api";
import { deleteTodo } from "@/api";
interface TaskProps {
  task: Itask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [modalOpenEdit, setModelOpenEdit] = useState<boolean>(false);
  const [modalOpenDeleted, setModelOpenDeleted] = useState<boolean>(false);
  const [tashToEdit, setTasktoEdit] = useState<string>(task.text);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: tashToEdit,
    });

    setModelOpenEdit(false);
    router.refresh();
  };
  const handleSubmitDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setModelOpenDeleted(false);
    router.refresh();
  };
  return (
    <tr key={task.id}>
      <td className="w-full">{task.text}</td>
      <td className="flex gap-5">
        <FiEdit
          onClick={() => setModelOpenEdit(true)}
          cursor="pointer"
          className="text-blue-300"
          size={25}
        />
        <Modal modalOpen={modalOpenEdit} setModelOpen={setModelOpenEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className="font-bold text-lg"> Edit the task</h3>
            <div className="modal-action">
              <input
                value={tashToEdit}
                onChange={(e) => setTasktoEdit(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full "
              />
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </form>
        </Modal>
        <FiTrash
          onClick={() => setModelOpenDeleted(true)}
          cursor="pointer"
          className="text-purple-400"
          size={25}
        />
        <Modal modalOpen={modalOpenDeleted} setModelOpen={setModelOpenDeleted}>
          <h3 className="text-lg">
            Are you sure ,you want to delete this task
          </h3>
          <div className="model-action">
            <button
              onClick={() => handleSubmitDeleteTask(task.id)}
              className="btn"
            >
              YES
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};
export default Task;
