import React from 'react'
import { FiEdit, FiTrash2 } from 'react-icons/fi'

export default function TableActions() {
  return (
    <div className="table-actions">
      <button className="btn secondary"><FiEdit style={{ marginRight: 6 }} />Edit</button>
      <button className="btn danger"><FiTrash2 style={{ marginRight: 6 }} />Delete</button>
    </div>
  )
}
