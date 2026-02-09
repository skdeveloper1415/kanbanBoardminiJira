import { createContext, useContext, useState, useEffect } from "react";

const BoardContext = createContext();
export const useBoard = () => useContext(BoardContext);

export default function BoardProvider({ children }) {
  const [tasks, setTasks] = useState(() =>
    JSON.parse(localStorage.getItem("tasks")) || {
      todo: [],
      inprogress: [],
      done: []
    }
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <BoardContext.Provider value={{ tasks, setTasks }}>
      {children}
    </BoardContext.Provider>
  );
}
