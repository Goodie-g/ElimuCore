import { FiMenu, FiUserPlus, FiUserCheck } from 'react-icons/fi'

export default function Navbar({ activeTab, onMenuClick, onAddStudent, onAddTeacher, onGoHome }) {
	const isDashboard = activeTab === 'dashboard'

	return (
		<nav className="navbar">
			<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
				<button aria-label="Toggle menu" className="btn secondary menu-btn" onClick={onMenuClick}>
					<FiMenu />
				</button>
				{isDashboard ? (
					<div className="brand">ElimuCore</div>
				) : (
					<button type="button" className="brand brand--clickable" onClick={onGoHome}>
						ElimuCore
					</button>
				)}
			</div>

			<div className="nav-actions">
				<button className="btn primary" onClick={onAddStudent}><FiUserPlus />Add Student</button>
				<button className="btn secondary" onClick={onAddTeacher}><FiUserCheck />Add Teacher</button>
			</div>
		</nav>
	)
}
