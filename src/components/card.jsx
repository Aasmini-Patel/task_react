import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

const STATUS_COLORS = {
  pending: "bg-gray-100 text-gray-800",
  in_progress: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
};

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const safeStatus = typeof task.status === "string" ? task.status : "pending";
  const [status, setStatus] = useState(safeStatus);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    onStatusChange?.(task._id, newStatus);
  };

  return (
    <div className="border rounded-2xl p-5 bg-white shadow hover:shadow-lg transition duration-200">
      <div className="flex justify-between items-start mb-3">
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
            STATUS_COLORS[status] || STATUS_COLORS.pending
          }`}
        >
          {status.replace("_", " ").toUpperCase()}
        </span>
        <div className="flex gap-3">
          <button
            onClick={() => onEdit(task)}
            className="text-gray-500 hover:text-blue-600 transition"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="text-gray-500 hover:text-red-600 transition"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <h3 className="font-semibold text-gray-900 text-lg">
        {task.title || "Untitled"}
      </h3>
      <p className="text-gray-600 mt-1 text-sm">
        {task.description || "No description provided"}
      </p>

      <select
        value={status}
        onChange={handleStatusChange}
        className={`mt-4 w-full border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${
          STATUS_COLORS[status] || STATUS_COLORS.pending
        }`}
      >
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
};

export default TaskCard;
