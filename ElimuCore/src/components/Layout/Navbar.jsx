import React from 'react'
import { FiUserPlus, FiMenu } from 'react-icons/fi'

export default function Navbar({ activeTab, onMenuClick, onAddStudent, onAddTeacher }) {
	return (
		<nav className="navbar">
			<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
				<button aria-label="Toggle menu" className="btn secondary menu-btn" onClick={onMenuClick}>
					<FiMenu />
				</button>
				<div className="brand">ElimuCore</div>
			</div>

			<div className="nav-actions">
				<button className="btn primary" onClick={onAddStudent}><FiUserPlus style={{ marginRight: 8 }} />Add Student</button>
				<button className="btn secondary" onClick={onAddTeacher}>Add Teacher</button>
			</div>
		</nav>
	)
}
