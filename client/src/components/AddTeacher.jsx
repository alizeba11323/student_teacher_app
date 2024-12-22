import { useEffect, useState } from "react";
function AddTeacher({ title, btnHandler, teacher: newTecaher }) {
  const [teacher, setTeacher] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "male",
    subject: "",
  });
  useEffect(() => {
    if (newTecaher !== undefined) {
      setTeacher(newTecaher);
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacher({ ...teacher, [name]: value });
  };
  const handleSave = () => {
    btnHandler(teacher);
  };
  return (
    <div className="overlay">
      <div className="add_card">
        <h2>{title ? title : "Add Teacher"}</h2>

        <div className="group">
          <input
            type="text"
            placeholder="Teacher Name"
            className="input"
            name="name"
            value={teacher.name}
            onChange={handleChange}
          />
        </div>
        <div className="group">
          <input
            type="text"
            placeholder="Subject"
            className="input"
            name="subject"
            value={teacher.subject}
            onChange={handleChange}
          />
        </div>
        <div className="group">
          <input
            type="text"
            placeholder="Email"
            className="input"
            name="email"
            value={teacher.email}
            onChange={handleChange}
          />
        </div>
        <div className="group">
          <input
            type="text"
            placeholder="Phone"
            className="input"
            name="phone"
            value={teacher.phone}
            onChange={handleChange}
          />
        </div>
        <div className="group">
          <input
            type="text"
            placeholder="Address"
            className="input"
            name="address"
            value={teacher.address}
            onChange={handleChange}
          />
        </div>
        <div className="group">
          <label htmlFor="female">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={teacher?.gender === "female"}
              onChange={handleChange}
            />
            female
          </label>

          <label htmlFor="male">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={teacher?.gender === "male"}
              onChange={handleChange}
            />
            male
          </label>
        </div>

        <button onClick={handleSave}>Add Teacher</button>
      </div>
    </div>
  );
}

export default AddTeacher;
