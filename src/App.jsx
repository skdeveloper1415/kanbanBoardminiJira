import { useState, useEffect } from "react";
import BoardProvider from "./context/BoardContext";
import Board from "./pages/Board";
import AddTaskModal from "./components/AddTaskModal";
import { Button } from "primereact/button";

function App() {
  const [addOpen, setAddOpen] = useState(false);
  // Load user theme OR default light
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  // Apply theme to <html> tag
  useEffect(() => {
    const html = document.documentElement;

    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);

  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <BoardProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-black p-6">

        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl dark:text-white font-bold">Mini Jira – Kanban Board</h1>

          <Button
            label="Add Task"
            icon="pi pi-plus"
            className="bg-amber-500! text-white!"
            onClick={() => setAddOpen(true)}
          />
        </div>

        {/* ADD TASK MODAL */}
        <AddTaskModal visible={addOpen} setVisible={setAddOpen} />

        {/* MAIN BOARD */}
        <Board />

        {/* THEME BUTTON */}
            <Button
              label={theme === "light" ? "Dark Mode" : "Light Mode"}
              icon={theme === "light" ? "pi pi-moon" : "pi pi-sun"}
              onClick={toggleTheme}
              className="dark:bg-gray-700 dark:text-white mt-4"
            />
      </div>
    </BoardProvider>
  );
}

export default App;
