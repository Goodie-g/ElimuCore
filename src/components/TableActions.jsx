import { FiEdit, FiTrash2 } from 'react-icons/fi'

export default function TableActions({ onEdit, onDelete }) {
  return (
    <div className="table-actions">
      <button className="btn secondary" type="button" onClick={onEdit}><FiEdit />Edit</button>
      <button className="btn danger" type="button" onClick={onDelete}><FiTrash2 />Delete</button>
    </div>
  )
}
