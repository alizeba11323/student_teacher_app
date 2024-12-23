import { LogOut } from "lucide-react";
import StudentDepartment from "./StudentDepartment";
import TecaherDepartment from "./TecaherDepartment";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    } else {
      axios
        .get("http://localhost:8000/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
    toast.success("Logged out successfully");
  };
  return (
    <div className="dashboard">
      <button
        style={{ position: "absolute", right: "10px", top: "10px" }}
        onClick={handleLogout}
      >
        <LogOut />
      </button>
      <h2>Hello {user?.name}, Welcome to Dashboard</h2>
      <div className="dashboard_part">
        <TecaherDepartment setRefresh={setRefresh} />
        <StudentDepartment refresh={refresh} />
      </div>
    </div>
  );
}

export default Dashboard;
