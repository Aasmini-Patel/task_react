import { useEffect, useState } from "react";
import { deleteTask, listTask, updateTask } from "./api/taskApi";
import AddTaskModal from "./components/addTaskModal";
import TaskCard from "./components/card";

function App() {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const loadTasks = async (reset = false) => {
  if (loading) return;
  setLoading(true);

  try {
    const nextPage = reset ? 1 : page; 
    const res = await listTask({ page: nextPage, limit: 10 });

    setTasks(prev => (reset ? res.data : [...prev, ...res.data]));
    setPage(nextPage + 1); 
  } catch (err) {
    alert("Failed to load tasks");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadTasks(true);
  }, []);

  
  const handleDeleteTask = async (taskId) => {
    setTasks((prev) => prev.filter((t) => t._id !== taskId));
    try {
      await deleteTask(taskId);
    } catch {
      alert("Failed to delete task");
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    const taskToUpdate = tasks.find((t) => t._id === taskId);
    if (!taskToUpdate) return;

    setTasks((prev) =>
      prev.map((t) => (t._id === taskId ? { ...t, status: newStatus } : t))
    );

    try {
      await updateTask({ id: taskId, taskStatus: newStatus });
    } catch {
      alert("Failed to update status");
      setTasks((prev) =>
        prev.map((t) => (t._id === taskId ? taskToUpdate : t))
      );
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <button
        onClick={() => setShowModal(true)}
        disabled={loading}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
      >
        + Add Task
      </button>

      <div className="grid gap-4 md:grid-cols-2">
        {tasks.map((task, i) => (
          <TaskCard
            key={task._id || i}
            task={task}
            onDelete={handleDeleteTask}
            onEdit={(task) => {
              setEditingTask(task);
              setShowModal(true);
            }}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>

      <button
        onClick={() => loadTasks(false)}
        disabled={loading}
        className="w-full py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition disabled:opacity-50"
      >
        {loading ? "Loading..." : "Load More"}
      </button>

      {showModal && (
        <AddTaskModal
          initialData={editingTask}
          onClose={() => {
            setShowModal(false);
            setEditingTask(null);
          }}
          onSuccess={(updatedTask, isEdit) => {
            if (isEdit)
              setTasks((prev) =>
                prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
              );
            else setTasks((prev) => [updatedTask, ...prev]);
          }}
        />
      )}
    </div>
  );
}

export default App;
