import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    if (data.password !== data.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/user/register",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(res.data.message);
      navigate("/login");
    } catch (err) {
      console.log(err.message);
      toast.error(err.response?.data.message);
    }
  };
  return (
    <div className="card">
      <h1>Register</h1>
      <div className="group">
        <input
          type="text"
          placeholder="Name"
          className="input"
          name="name"
          value={data.name}
          onChange={handleChange}
        />
      </div>
      <div className="group">
        <input
          type="text"
          placeholder="Username"
          className="input"
          name="username"
          value={data.username}
          onChange={handleChange}
        />
      </div>
      <div className="group">
        <input
          type="email"
          placeholder="Email"
          className="input"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
      </div>
      <div className="group">
        <input
          type="password"
          placeholder="Password"
          className="input"
          name="password"
          value={data.password}
          onChange={handleChange}
        />
      </div>
      <div className="group">
        <input
          type="password"
          placeholder="Confirm Password"
          className="input"
          name="confirmPassword"
          value={data.confirmPassword}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleSubmit}>Register</button>
      <div>
        Already have an account? <Link to={"/login"}>Login</Link>
      </div>
    </div>
  );
}

export default Register;
