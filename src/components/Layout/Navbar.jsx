import { FiMenu, FiUserPlus, FiUserCheck } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function Navbar({ onMenuClick, onAddStudent, onAddTeacher }) {
	return (
		<nav className="navbar">
			<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
				<button aria-label="Toggle menu" className="btn secondary menu-btn" onClick={onMenuClick}>
					<FiMenu />
				</button>
				<Link to="/dashboard" className="brand brand--clickable">
					ElimuCore
				</Link>
			</div>

			<div className="nav-actions">
				<button className="btn primary" onClick={onAddStudent}><FiUserPlus />Add Student</button>
				<button className="btn secondary" onClick={onAddTeacher}><FiUserCheck />Add Teacher</button>
			</div>
		</nav>
	)
}
