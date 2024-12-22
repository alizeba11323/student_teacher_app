import axios from "axios";
import { Pencil, Trash, UserCheck, UserCog } from "lucide-react";
import { useEffect, useState } from "react";
function Student({ student, handleEdit, handleDelete, handleAssignTeacher }) {
  const [show, setShow] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [teacher, setTeacher] = useState("");
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

  return (
    <div className="t_card">
      <div>{student?.name}</div>
      {show && (
        <div className="group">
          <select
            className="input"
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
          >
            <option value={""}>No Teacher</option>
            {teachers?.map((teacher) => {
              return (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </option>
              );
            })}
          </select>
        </div>
      )}
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={() => {
            if (teacher) {
              handleAssignTeacher(teacher, student?._id);
              setTeacher("");
            }
            setShow((prev) => !prev);
          }}
        >
          {show ? <UserCheck size={16} /> : <UserCog size={16} />}
        </button>
        {!show && (
          <>
            <button onClick={() => handleEdit(student)}>
              <Pencil size={16} />
            </button>
            <button onClick={() => handleDelete(student?._id)}>
              <Trash size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Student;
