import React from 'react'
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
		<aside className={`sidebar ${isOpen ? 'mobile-open' : ''}`} aria-hidden={isOpen ? 'false' : 'true'}>
			<ul>
				{items.map((it) => (
					<li key={it.id} className={activeTab === it.id ? 'active' : ''} onClick={() => handleClick(it.id)}>
						<it.Icon style={{ marginRight: 10, verticalAlign: 'middle' }} />{it.label}
					</li>
				))}
			</ul>
		</aside>
	)
}
