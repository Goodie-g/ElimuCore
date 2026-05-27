import { FaEdit, FaTrash } from 'react-icons/fa';

export default function TableActions() {
  return (
    <div className="actions">
      <button className="icon-btn edit">
        <FaEdit />
      </button>

      <button className="icon-btn delete">
        <FaTrash />
      </button>
    </div>
  );
}