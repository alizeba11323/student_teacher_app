import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/user/login",
        data
      );
      toast.success(res.data.message);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      console.log(err.message);
      toast.error(err.response?.data.message);
    }
  };
  return (
    <div className="card">
      <h1>Login</h1>
      <div className="group">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth={"1"}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path>
          <path d="M3 7l9 6l9 -6"></path>
        </svg>
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
        <svg
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="icon"
        >
          <path
            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
        <input
          className="input"
          type="password"
          placeholder="password"
          name="password"
          value={data.password}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleSubmit}>Login</button>
      <div>
        Dont have an account? <Link to={"/register"}>Signup</Link>
      </div>
    </div>
  );
}

export default Login;
