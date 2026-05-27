export default function Header({ title, showButtons }) {
  return (
    <div className="page-header">
      <div>
        <h1>{title}</h1>
        <p>School Management System</p>
      </div>

      {showButtons && (
        <div className="header-buttons">
          <button className="secondary-btn">Add Teacher</button>
          <button className="primary-btn">Add Student</button>
        </div>
      )}
    </div>
  );
}