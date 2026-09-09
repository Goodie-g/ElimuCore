import { FiBarChart2, FiCalendar, FiHome, FiUsers, FiBookOpen } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'

export default function Sidebar({ isOpen, setSidebarOpen }) {
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
							<span className={`sidebar-icon${it.to === '/dashboard' ? ' sidebar-icon--dashboard' : ''}`}>
								<it.Icon size={20} aria-hidden="true" />
							</span>
							{it.label}
						</NavLink>
					</li>
				))}
			</ul>
		</div>
	)
}
