import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post("/auth/login", form);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("name", res.data.name);
    navigate("/dashboard");
  };

  return (
  <div className="container d-flex justify-content-center align-items-center vh-100">
    <div className="col-md-5 col-lg-4">
      <div className="card shadow-lg border-0">
        <div className="card-body p-4">

          {/* Header */}
          <div className="text-center mb-4">
            <h4 className="fw-bold">Welcome Back</h4>
            <p className="text-muted mb-0">Login to access your dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>

            <button className="btn btn-primary w-100 py-2 fw-semibold">
              Login
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-3">
            <small className="text-muted">
              Don't have an account?{" "}
              <Link to="/register" className="text-decoration-none fw-semibold">
                Create Account
              </Link>
            </small>
          </div>

        </div>
      </div>
    </div>
  </div>
);

}

export default Login;
