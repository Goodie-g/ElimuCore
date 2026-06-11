import { useMemo, useState } from 'react';
import { FiCheckCircle, FiClock, FiEye, FiSearch, FiUserCheck, FiUserX, FiX } from 'react-icons/fi';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import StatsCard from '../components/StatsCard';

const STATUS_SCORE = {
  present: 100,
  late: 75,
  absent: 0,
};

const STATUS_LABEL = {
  present: 'Present',
  late: 'Late',
  absent: 'Absent',
};

const EMPTY_STUDENTS = [];

function averageOf(students, field) {
  const values = students
    .map((student) => student[field])
    .filter((value) => Number.isFinite(value));

  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function nextAttendanceValue(student, status) {
  const current = Number.isFinite(student.attendance) ? student.attendance : STATUS_SCORE[status];
  return Math.max(0, Math.min(100, Number((((current * 19) + STATUS_SCORE[status]) / 20).toFixed(1))));
}

export default function Attendance({ schoolData }) {
  const students = schoolData?.students ?? EMPTY_STUDENTS;
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [marks, setMarks] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(null);
  const query = search.trim().toLowerCase();

  const classes = useMemo(() => (
    [...new Set(students.map((student) => student.class).filter(Boolean))].sort()
  ), [students]);

  const visibleStudents = students.filter((student) => {
    const matchesClass = classFilter === 'all' || student.class === classFilter;
    const matchesSearch = [student.name, student.gender, student.class, student.division]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(query));

    return matchesClass && matchesSearch;
  });

  const averageAttendance = averageOf(students, 'attendance');
  const markedToday = Object.keys(marks).length;
  const presentToday = Object.values(marks).filter((status) => status === 'present').length;
  const absentToday = Object.values(marks).filter((status) => status === 'absent').length;

  const setStatus = (studentId, status) => {
    setMarks((prev) => ({ ...prev, [studentId]: status }));
  };

  const applyAttendance = () => {
    const attendanceUpdates = {};

    students.forEach((student) => {
      const status = marks[student.id];
      if (status) attendanceUpdates[student.id] = nextAttendanceValue(student, status);
    });

    schoolData.updateStudentAttendance(attendanceUpdates);
    setMarks({});
  };

  const markVisible = (status) => {
    setMarks((prev) => {
      const next = { ...prev };
      visibleStudents.forEach((student) => {
        next[student.id] = status;
      });
      return next;
    });
  };

  return (
    <div className="attendance-page">
      <Header
        title="Attendance"
        subtitle={`${visibleStudents.length} students ready for today's register`}
      />

      <div className="stats-flex attendance-stats">
        <StatsCard
          icon={<FiUserCheck />}
          note="Current student data"
          title="Average Attendance"
          value={`${averageAttendance.toFixed(1)}%`}
        />
        <StatsCard
          icon={<FiCheckCircle />}
          note="Marked as present"
          title="Present"
          value={presentToday.toLocaleString()}
        />
        <StatsCard
          icon={<FiUserX />}
          note="Marked as absent"
          title="Absent"
          value={absentToday.toLocaleString()}
        />
        <StatsCard
          icon={<FiClock />}
          note="Unsaved marks"
          title="Marked Today"
          value={markedToday.toLocaleString()}
        />
      </div>

      <div className="table-container">
        <div className="table-top attendance-toolbar">
          <SearchBar value={search} onChange={setSearch} placeholder="Search students" />
          <select value={classFilter} onChange={(event) => setClassFilter(event.target.value)}>
            <option value="all">All classes</option>
            {classes.map((className) => (
              <option key={className} value={className}>{className}</option>
            ))}
          </select>
          <button className="btn secondary" type="button" onClick={() => markVisible('present')}>
            <FiCheckCircle />Mark Visible Present
          </button>
          <button className="btn primary" type="button" onClick={applyAttendance} disabled={!markedToday}>
            Save Attendance
          </button>
        </div>

        <div className="attendance-results-bar">
          <span><FiSearch />Showing {visibleStudents.length} of {students.length}</span>
          <span>{markedToday ? `${markedToday} marks waiting to save` : 'No unsaved marks'}</span>
        </div>

        <div className="table-wrapper">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Class</th>
                <th>Current Attendance</th>
                <th>Today</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.class}</td>
                  <td>{Number.isFinite(student.attendance) ? `${student.attendance}%` : 'N/A'}</td>
                  <td>
                    <div className="attendance-mark-group" aria-label={`Mark attendance for ${student.name}`}>
                      {Object.keys(STATUS_LABEL).map((status) => (
                        <button
                          className={`attendance-mark ${marks[student.id] === status ? 'active' : ''}`}
                          key={status}
                          type="button"
                          onClick={() => setStatus(student.id, status)}
                        >
                          {STATUS_LABEL[status]}
                        </button>
                      ))}
                    </div>
                  </td>
                  <td>
                    <button className="btn secondary" type="button" onClick={() => setSelectedStudent(student)}>
                      <FiEye />View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedStudent && (
        <div className="student-detail-overlay" onClick={() => setSelectedStudent(null)}>
          <article className="student-detail-card" onClick={(event) => event.stopPropagation()}>
            <div className="student-detail-heading">
              <div>
                <span>Student Details</span>
                <h3>{selectedStudent.name}</h3>
              </div>
              <button className="btn secondary" type="button" onClick={() => setSelectedStudent(null)}>
                <FiX />Hide
              </button>
            </div>

            <div className="student-detail-grid">
              <div><span>ID</span><strong>{selectedStudent.id}</strong></div>
              <div><span>Gender</span><strong>{selectedStudent.gender || 'N/A'}</strong></div>
              <div><span>Class</span><strong>{selectedStudent.class || 'N/A'}</strong></div>
              <div><span>Attendance</span><strong>{Number.isFinite(selectedStudent.attendance) ? `${selectedStudent.attendance}%` : 'N/A'}</strong></div>
              <div><span>Average</span><strong>{Number.isFinite(selectedStudent.average) ? selectedStudent.average.toFixed(1) : 'N/A'}</strong></div>
              <div><span>Division</span><strong>{selectedStudent.division || 'N/A'}</strong></div>
            </div>
          </article>
        </div>
      )}
    </div>
  );
}
