import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useState } from "react";
import { useBoard } from "../context/BoardContext";

export default function AddTaskModal({ visible, setVisible }) {
  const { setTasks } = useBoard();
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Low",
    assignee: ""
  });

  const priorities = ["Low", "Medium", "High"];

  const handleCreate = () => {
    if (!form.title.trim()) return;

    const newTask = { ...form, id: Date.now() };

    setTasks((prev) => ({
      ...prev,
      todo: [...prev.todo, newTask],
    }));

    setVisible(false);
  };

  return (
    <Dialog header="Add Task" style={{ width: "50rem" }} className='overflow-hidden!' showHeader={false} headerClassName="p-5" visible={visible} onHide={() => setVisible(false)}>
        <div className="flex items-center justify-between p-5 [&>h3]:font-bold [&>h3]:uppercase [&>h3]:#000">
            <h3>Add Task</h3>
            <button className="bg-[#000]! text-white capitalize" onClick={() => setVisible(false)}>closed</button>
        </div>
      <div className="flex flex-col gap-3 p-5 [&>input]:w-full [&>input]:p-3 [&>input]:border [&>input]:border-gray-300 [&>input]:rounded [&_.p-dropdown]:w-full [&_.p-dropdown]:p-3 [&_.p-dropdown]:border [&_.p-dropdown]:border-gray-300 [&_.p-dropdown]:rounded">
        <InputText
          placeholder="Title *"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <InputText
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <Dropdown
          value={form.priority}
          options={priorities}
          onChange={(e) => setForm({ ...form, priority: e.value })}
          placeholder="Priority"
        />
        <InputText
          placeholder="Assignee"
          value={form.assignee}
          onChange={(e) => setForm({ ...form, assignee: e.target.value })}
        />

        <Button label="Create" className="bg-[#000]! text-white!" onClick={handleCreate} />
      </div>
    </Dialog>
  );
}
