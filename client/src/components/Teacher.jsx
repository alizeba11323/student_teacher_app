import { Pencil, Trash } from "lucide-react";
function Teacher({ teacher, handleDelete, handleEdit }) {
  return (
    <div className="t_card">
      <div>{teacher?.name}</div>
      <div style={{ display: "flex", gap: "10px" }}>
        <button>
          <Pencil size={16} onClick={() => handleEdit(teacher)} />
        </button>
        <button onClick={() => handleDelete(teacher?._id)}>
          <Trash size={16} />
        </button>
      </div>
    </div>
  );
}

export default Teacher;
