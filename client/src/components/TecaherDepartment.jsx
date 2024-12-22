import { useEffect, useState } from "react";
import AddTeacher from "./AddTeacher";
import Teacher from "./Teacher";
import axios from "axios";
import toast from "react-hot-toast";
function TecaherDepartment() {
  const [show, setShow] = useState(false);
  const [editedId, setEditedId] = useState(null);
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/teacher", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setTeachers(res.data.teachers);
      });
  }, []);
  const handleShow = () => {
    setShow((prev) => !prev);
  };
  const handleEdit = (id) => {
    setShow(true);
    setEditedId(id);
  };
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/teacher/${id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const teachers1 = teachers.filter((teacher) => teacher._id !== id);
      console.log(teachers1);
      setTeachers(teachers1);
      toast.success(res.data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };
  const handleUpdate = async (teacher) => {
    try {
      const res = await axios.put(
        "http://localhost:8000/api/teacher/" + editedId?._id,
        teacher,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      toast.success(res.data.message);
      const newTeachers = teachers.map((tc) => {
        if (tc._id === editedId?._id) {
          return res.data.teacher;
        }
        return tc;
      });
      setTeachers(newTeachers);
      setShow(false);
      setEditedId(null);
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data.message);
    }
  };
  const handleSave = async (teacher) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/teacher/add",
        teacher,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      toast.success(res.data.message);
      setTeachers((prev) => [...prev, res.data.teacher]);
      setShow(false);
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      {show && editedId ? (
        <AddTeacher
          title={"Edit Teacher"}
          btnHandler={handleUpdate}
          teacher={editedId}
        />
      ) : (
        show && <AddTeacher title={"Add Teacher"} btnHandler={handleSave} />
      )}
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "90px",
          }}
        >
          <h2>Teacher List</h2>
          <button onClick={handleShow}>+</button>
        </div>
        {teachers?.length === 0 && "No Teacher"}
        {teachers?.map((teacher) => (
          <Teacher
            key={teacher?._id}
            teacher={teacher}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </div>
    </>
  );
}

export default TecaherDepartment;
