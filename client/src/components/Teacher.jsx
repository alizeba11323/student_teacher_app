import { Pencil, Trash } from "lucide-react";
function Teacher({ teacher, handleDelete, handleEdit }) {
  return (
    <div className="t_card">
      <div>{teacher?.name}</div>
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => handleEdit(teacher)}>
          <Pencil size={16} />
        </button>
        <button onClick={() => handleDelete(teacher?._id)}>
          <Trash size={16} />
        </button>
      </div>
    </div>
  );
}

export default Teacher;
