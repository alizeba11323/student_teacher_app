import axios from "axios";
import { useEffect, useState } from "react";
import AddStudent from "./AddStudent";
import Student from "./Student";
import toast from "react-hot-toast";

function StudentDepartment({ refresh }) {
  const [students, setStudents] = useState([]);
  const [filterStudents, setFilterStudents] = useState([]);
  const [editedId, setEditedId] = useState(null);
  const [show, setShow] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [teacher, setTeacher] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/student/all", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setStudents(res.data.students);
        setFilterStudents(res.data.students);
      });
  }, []);
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
  }, [refresh]);
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
      setFilterStudents(students1);
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
        if (tc._id.toString() === editedId?._id.toString()) {
          return res.data.student;
        }
        return tc;
      });
      setStudents(newStudents);
      setFilterStudents(newStudents);
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
      setFilterStudents((prev) => [...prev, res.data.student]);
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
      const newStudents = students.map((tc) => {
        if (tc._id.toString() === student.toString()) {
          return res.data.student;
        }
        return tc;
      });
      setStudents(newStudents);
      setFilterStudents(newStudents);
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
          setShow={setShow}
        />
      ) : (
        show && (
          <AddStudent
            title={"Add Student"}
            btnHandler={handleSave}
            setShow={setShow}
          />
        )
      )}
      <div className="card">
        <div className="group">
          <select
            className="input"
            value={teacher}
            onChange={(e) => {
              setTeacher(e.target.value);
              if (e.target.value === "") {
                setFilterStudents(students);
              } else {
                const filterStudent = students.filter(
                  (st) => st.assign_teacher.toString() === e.target.value
                );
                console.log(filterStudent);
                setFilterStudents(filterStudent);
              }
            }}
          >
            <option value={""}>All Students</option>
            {teachers?.map((teacher) => {
              return (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </option>
              );
            })}
          </select>
        </div>
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
        {filterStudents?.length === 0 && "No Student"}
        {filterStudents?.map((student) => {
          return (
            <Student
              key={student?._id}
              student={student}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleAssignTeacher={handleAssignTeacher}
              teachers={teachers}
            />
          );
        })}
      </div>
    </>
  );
}

export default StudentDepartment;
