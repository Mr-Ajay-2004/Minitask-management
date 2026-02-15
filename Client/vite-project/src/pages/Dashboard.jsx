import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    await API.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const toggleStatus = async (task) => {
    await API.put(`/tasks/${task._id}`, {
      status: task.status === "pending" ? "completed" : "pending",
    });
    fetchTasks();
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

 return (
  <div className="container py-5">
    <div className="card shadow-lg border-0">
      <div className="card-body">

        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h4 className="fw-bold mb-0">
              Dashboard
            </h4>
            <small className="text-muted">
              Welcome, {localStorage.getItem("name")}
            </small>
          </div>

          <button 
            className="btn btn-outline-danger btn-sm"
            onClick={logout}
          >
            <i className="bi bi-box-arrow-right me-1"></i>
            Logout
          </button>
        </div>

        {/* Add Task Section */}
        <div className="card bg-light border-0 mb-4">
          <div className="card-body">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter new task..."
              />
              <button 
                className="btn btn-primary px-4"
                onClick={addTask}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>

        {/* Task List */}
        <div>
          <h6 className="fw-semibold mb-3 text-secondary">
            Your Tasks
          </h6>

          <ul className="list-group list-group-flush">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="list-group-item d-flex justify-content-between align-items-center py-3"
              >
                <div>
                  <span
                    className={`fw-medium ${
                      task.status === "completed"
                        ? "text-decoration-line-through text-muted"
                        : ""
                    }`}
                  >
                    {task.title}
                  </span>

                  <div>
                    <small className={`badge ${
                      task.status === "completed"
                        ? "bg-success"
                        : "bg-warning text-dark"
                    } mt-1`}>
                      {task.status}
                    </small>
                  </div>
                </div>

                <div>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => toggleStatus(task)}
                  >
                    Toggle
                  </button>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {tasks.length === 0 && (
            <div className="text-center text-muted py-4">
              No tasks available. Add a new task to get started.
            </div>
          )}
        </div>

      </div>
    </div>
  </div>
);

}

export default Dashboard;
