import { useState } from 'react'
import { FiBarChart2, FiCalendar, FiHome, FiUsers, FiBookOpen, FiRefreshCw } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import Modal from '../UI/Modal'

export default function Sidebar({ isOpen, setSidebarOpen, onReset }) {
	const [confirmReset, setConfirmReset] = useState(false)

	const items = [
		{ to: '/dashboard', label: 'Dashboard', Icon: FiHome },
		{ to: '/teachers', label: 'Teachers', Icon: FiUsers },
		{ to: '/students', label: 'Students', Icon: FiBookOpen },
		{ to: '/attendance', label: 'Attendance', Icon: FiCalendar },
		{ to: '/grades', label: 'Grades', Icon: FiBarChart2 },
	]

	return (
		<div className={`sidebar ${isOpen ? 'mobile-open' : ''}`}>
			<ul>
				{items.map((it) => (
					<li key={it.to}>
						<NavLink
							className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
							to={it.to}
							onClick={() => {
								if (typeof setSidebarOpen === 'function') setSidebarOpen(false)
							}}
						>
							<span className="sidebar-icon">
								<it.Icon size={20} aria-hidden="true" />
							</span>
							{it.label}
						</NavLink>
					</li>
				))}
			</ul>

			<div className="sidebar-footer">
				<button className="sidebar-reset" type="button" onClick={() => setConfirmReset(true)}>
					<FiRefreshCw aria-hidden="true" />
					Reset demo data
				</button>
			</div>

			<Modal isOpen={confirmReset} onClose={() => setConfirmReset(false)}>
				<h3 className="modal-title">Reset demo data</h3>
				<p className="muted">
					This restores the original students and teachers and deletes all saved attendance
					registers. This cannot be undone.
				</p>
				<div className="form-actions">
					<button type="button" className="btn secondary" onClick={() => setConfirmReset(false)}>
						Cancel
					</button>
					<button
						type="button"
						className="btn danger"
						onClick={() => {
							setConfirmReset(false)
							onReset?.()
						}}
					>
						Reset data
					</button>
				</div>
			</Modal>
		</div>
	)
}
