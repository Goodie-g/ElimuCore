import { NavLink } from 'react-router-dom';
import {
  FaChartPie,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaClipboardList,
} from 'react-icons/fa';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">EduTrack</h2>

      <nav>
        <NavLink to="/">
          <FaChartPie />
          Dashboard
        </NavLink>

        <NavLink to="/teachers">
          <FaChalkboardTeacher />
          Teachers
        </NavLink>

        <NavLink to="/students">
          <FaUserGraduate />
          Students
        </NavLink>

        <NavLink to="/grades">
          <FaClipboardList />
          Grades
        </NavLink>
      </nav>
    </aside>
  );
}