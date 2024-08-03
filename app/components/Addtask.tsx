"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./model";
import { FormEventHandler } from "react";
import { useState } from "react";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModelOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");
  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo({
      id: "uuidv4",
      text: newTaskValue,
    });
    setNewTaskValue("");
    setModelOpen(false);
    router.refresh();
  };
  return (
    <div>
      <button
        onClick={() => setModelOpen(true)}
        className="btn btn-primary w-full"
      >
        Add new Task <AiOutlinePlus className="ml-2" size={18} />
      </button>
      <Modal modalOpen={modalOpen} setModelOpen={setModelOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className="font-bold text-lg"> add new task</h3>
          <div className="modal-action">
            <input
              value={newTaskValue}
              onChange={(e) => setNewTaskValue(e.target.value)}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
