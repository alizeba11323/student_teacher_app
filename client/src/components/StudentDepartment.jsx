import axios from "axios";
import { useEffect, useState } from "react";
import AddStudent from "./AddStudent";
import Student from "./Student";
import toast from "react-hot-toast";

function StudentDepartment() {
  const [students, setStudents] = useState([]);
  const [editedId, setEditedId] = useState(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/student/all", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setStudents(res.data.students);
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
        `http://localhost:8000/api/student/delete/${id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const students1 = students.filter((student) => student._id !== id);
      console.log(students1);
      setStudents(students1);
      toast.success(res.data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };
  const handleUpdate = async (student) => {
    try {
      const res = await axios.put(
        "http://localhost:8000/api/student/update/" + editedId?._id,
        student,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      toast.success(res.data.message);
      const newStudents = students.map((tc) => {
        if (tc._id === editedId?._id) {
          return res.data.student;
        }
        return tc;
      });
      setStudents(newStudents);
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
        "http://localhost:8000/api/student/add",
        teacher,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      toast.success(res.data.message);
      setStudents((prev) => [...prev, res.data.student]);
      setShow(false);
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data.message);
    }
  };
  const handleAssignTeacher = async (teacher, student) => {
    try {
      const res = await axios.patch(
        "http://localhost:8000/api/student/assign_teacher",
        { teacher_id: teacher, student_id: student },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      toast.success(res.data.message);
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      {show && editedId ? (
        <AddStudent
          title={"Edit Student"}
          btnHandler={handleUpdate}
          student={editedId}
        />
      ) : (
        show && <AddStudent title={"Add Student"} btnHandler={handleSave} />
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
          <h2 style={{ textAlign: "center" }}>Student List</h2>
          <button onClick={handleShow}>+</button>
        </div>
        {students?.length === 0 && "No Student"}
        {students.map((student) => {
          return (
            <Student
              key={student?._id}
              student={student}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleAssignTeacher={handleAssignTeacher}
            />
          );
        })}
      </div>
    </>
  );
}

export default StudentDepartment;
