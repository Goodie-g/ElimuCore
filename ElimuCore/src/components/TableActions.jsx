import { FiEdit, FiTrash2 } from 'react-icons/fi'

export default function TableActions() {
  return (
    <div className="table-actions">
      <button className="btn secondary"><FiEdit />Edit</button>
      <button className="btn danger"><FiTrash2 />Delete</button>
    </div>
  )
}
