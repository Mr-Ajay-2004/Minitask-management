import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/auth/register", form);
    navigate("/");
  };

  return (
  <div className="container d-flex justify-content-center align-items-center vh-100">
    <div className="col-md-6 col-lg-4">
      <div className="card shadow-lg border-0">
        <div className="card-body p-4">

          {/* Header */}
          <div className="text-center mb-4">
            <h4 className="fw-bold">Create Account</h4>
            <p className="text-muted mb-0">
              Register to start managing your tasks
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label fw-semibold">Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Create a password"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>

            <button className="btn btn-primary w-100 py-2 fw-semibold">
              Register
            </button>

          </form>

          {/* Footer */}
          <div className="text-center mt-3">
            <small className="text-muted">
              Already have an account?{" "}
              <Link to="/" className="fw-semibold text-decoration-none">
                Login
              </Link>
            </small>
          </div>

        </div>
      </div>
    </div>
  </div>
);

}

export default Register;
