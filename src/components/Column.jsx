import { SortableContext } from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";

export default function Column({ title, id, items }) {
  const { setNodeRef } = useDroppable({
    id: id,
    data: {
      columnId: id,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow min-h-[500px]"
    >
      {/* Title */}
      <div className="flex justify-between mb-3">
        <h2 className="font-bold text-lg">{title}</h2>
        <span className="text-sm bg-gray-300 dark:bg-amber-500 px-2 rounded">{items.length}</span>
      </div>

      <SortableContext items={items.map((i) => i.id)}>
        {items.map((task, index) => (
          <TaskCard key={task.id} data={task} columnId={id} index={index} />
        ))}
      </SortableContext>
    </div>
  );
}
