import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Tag } from "primereact/tag";
import { useState } from "react";
import EditTaskModal from "./EditTaskModal";

export default function TaskCard({ data, columnId, index }) {
  const [editOpen, setEditOpen] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: data.id,
      data: {
        task: data,
        columnId,
        index
      }
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "danger";
      case "Medium":
        return "warning";
      default:
        return "success";
    }
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={() => setEditOpen(true)}
        className="bg-white dark:bg-gray-600 p-3 rounded-lg shadow cursor-pointer hover:shadow-lg transition mb-3"
      >
        <h3 className="font-semibold text-md">{data.title}</h3>

        <p className="text-sm text-gray-600 mt-1">
          {data.description || "No description"}
        </p>

        <div className="flex justify-between items-center mt-3">
          <Tag
            severity={getPriorityColor(data.priority)}
            value={data.priority} className="py-1.5 px-3"
          />
          <span className="text-xs bg-gray-200 dark:bg-purple-600 px-2 py-1 rounded">
            {data.assignee || "Unassigned"}
          </span>
        </div>
      </div>

      <EditTaskModal
        visible={editOpen}
        setVisible={setEditOpen}
        data={data}
        columnId={columnId}
      />
    </>
  );
}
