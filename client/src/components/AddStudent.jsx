import { useEffect, useState } from "react";

function AddStudent({ title, btnHandler, student: new_student, setShow }) {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    student_class: "",
    gender: "male",
  });
  useEffect(() => {
    if (new_student !== undefined) {
      setStudent(new_student);
    }
  }, []);
  const handleChange = (e) => {
    setStudent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSave = () => {
    btnHandler(student);
  };
  return (
    <div className="overlay">
      <div className="card">
        <h2>{title ? title : "Add Student"} </h2>
        <div className="group">
          <input
            type="text"
            placeholder="Student Name"
            className="input"
            name="name"
            value={student.name}
            onChange={handleChange}
          />
        </div>
        <div className="group">
          <input
            type="email"
            placeholder="Email"
            className="input"
            name="email"
            value={student.email}
            onChange={handleChange}
          />
        </div>
        <div className="group">
          <input
            type="text"
            placeholder="Phone"
            className="input"
            name="phone"
            value={student.phone}
            onChange={handleChange}
          />
        </div>
        <div className="group">
          <input
            type="text"
            placeholder="Address"
            className="input"
            name="address"
            value={student.address}
            onChange={handleChange}
          />
        </div>
        <div className="group">
          <input
            type="text"
            placeholder="Student Class"
            className="input"
            name="student_class"
            value={student.student_class}
            onChange={handleChange}
          />
        </div>
        <div className="group">
          <label htmlFor="female">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={student?.gender === "female"}
              onChange={handleChange}
            />
            Female
          </label>

          <label htmlFor="male">
            <input
              type="radio"
              name="gender"
              value={"male"}
              checked={student?.gender === "male"}
              onChange={handleChange}
            />
            Male
          </label>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => setShow((prev) => !prev)}>Back</button>
          <button onClick={handleSave}>{title}</button>
        </div>
      </div>
    </div>
  );
}

export default AddStudent;
