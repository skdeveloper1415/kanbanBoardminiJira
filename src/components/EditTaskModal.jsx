import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useState } from "react";
import { useBoard } from "../context/BoardContext";

export default function EditTaskModal({ visible, setVisible, data, columnId }) {
  const { tasks, setTasks } = useBoard();

  const [form, setForm] = useState({
    title: data.title,
    description: data.description,
    priority: data.priority,
    assignee: data.assignee
  });

  const priorities = ["Low", "Medium", "High"];

  // UPDATE TASK
  const updateTask = () => {
    if (!form.title.trim()) return;

    const updated = tasks[columnId].map((task) =>
      task.id === data.id ? { ...task, ...form } : task
    );

    setTasks({
      ...tasks,
      [columnId]: updated
    });

    setVisible(false);
  };

  // DELETE TASK
  const deleteTask = () => {
    if (!confirm("Are you sure to delete this task?")) return;

    const filtered = tasks[columnId].filter((t) => t.id !== data.id);

    setTasks({
      ...tasks,
      [columnId]: filtered
    });

    setVisible(false);
  };

  return (
    <Dialog
      header="Edit Task"
      headerClassName="p-5"
      className='overflow-hidden!'
      visible={visible}
      onHide={() => setVisible(false)}
      style={{ width: "50rem" }}
      showHeader={false}
    >
        <div className="flex items-center justify-between p-5 [&>h3]:font-bold [&>h3]:uppercase [&>h3]:#000">
            <h3>Edit Task</h3>
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
        />

        <InputText
          placeholder="Assignee"
          value={form.assignee}
          onChange={(e) => setForm({ ...form, assignee: e.target.value })}
        />

        <div className="flex justify-between mt-4">
          <Button label="Delete" className="bg-red-500! text-white capitalize" severity="danger" icon="pi pi-trash" onClick={deleteTask} />
          <Button label="Update" className="bg-green-600! text-white capitalize" icon="pi pi-check" onClick={updateTask} />
        </div>
      </div>
    </Dialog>
  );
}
