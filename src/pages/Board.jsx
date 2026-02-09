import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { arrayMove } from "@dnd-kit/sortable";
import Column from "../components/Column";
import { useBoard } from "../context/BoardContext";

export default function Board() {
  const { tasks, setTasks } = useBoard();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const oldCol = active.data.current.columnId;
    const newCol = over.data.current.columnId;

    // SAME COLUMN MOVE
    if (oldCol === newCol) {
      const oldIndex = active.data.current.index;
      const newIndex = over.data.current.index;

      const updated = arrayMove(tasks[oldCol], oldIndex, newIndex);

      setTasks({
        ...tasks,
        [oldCol]: updated,
      });
      return;
    }

    // MOVE TO NEW COLUMN
    const activeTask = active.data.current.task;

    const oldList = [...tasks[oldCol]].filter((t) => t.id !== activeTask.id);
    const newList = [...tasks[newCol], activeTask];

    setTasks({
      ...tasks,
      [oldCol]: oldList,
      [newCol]: newList,
    });
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Column title="Todo" id="todo" items={tasks.todo} />
        <Column title="In Progress" id="inprogress" items={tasks.inprogress} />
        <Column title="Done" id="done" items={tasks.done} />
      </div>
    </DndContext>
  );
}
