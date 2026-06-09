import { FiHome, FiUsers, FiBookOpen, FiBarChart2 } from 'react-icons/fi'

export default function Sidebar({ activeTab, setActiveTab, isOpen, setSidebarOpen }) {
	const items = [
		{ id: 'dashboard', label: 'Dashboard', Icon: FiHome },
		{ id: 'teachers', label: 'Teachers', Icon: FiUsers },
		{ id: 'students', label: 'Students', Icon: FiBookOpen },
		{ id: 'grades', label: 'Grades', Icon: FiBarChart2 },
	]

	const handleClick = (id) => {
		setActiveTab(id)
		if (typeof setSidebarOpen === 'function') setSidebarOpen(false)
	}

	return (
		<div className={`sidebar ${isOpen ? 'mobile-open' : ''}`}>
			<ul>
				{items.map((it) => (
					<li key={it.id} className={activeTab === it.id ? 'active' : ''} onClick={() => handleClick(it.id)}>
						<span className={`sidebar-icon${it.id === 'dashboard' ? ' sidebar-icon--dashboard' : ''}`}>
							<it.Icon size={20} aria-hidden="true" />
						</span>
						{it.label}
					</li>
				))}
			</ul>
		</div>
	)
}
