import { useMemo, useState } from 'react';
import { useBlocker, useOutletContext } from 'react-router-dom';
import { FiCheckCircle, FiClock, FiEye, FiSearch, FiUserCheck, FiUserX, FiX } from 'react-icons/fi';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Modal from '../components/UI/Modal';
import StatsCard from '../components/StatsCard';
import { STATUS_LABEL, formatDate, getTodayISO } from '../utils/attendance';

const EMPTY_STUDENTS = [];
const EMPTY_REGISTERS = {};

function averageOf(students, field) {
  const values = students
    .map((student) => student[field])
    .filter((value) => Number.isFinite(value));

  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export default function Attendance() {
  const schoolData = useOutletContext();
  const students = schoolData?.students ?? EMPTY_STUDENTS;
  const registers = schoolData?.attendanceRegisters ?? EMPTY_REGISTERS;
  const todayISO = getTodayISO();

  const [selectedDate, setSelectedDate] = useState(todayISO);
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [marks, setMarks] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(null);
  const query = search.trim().toLowerCase();

  const isToday = selectedDate === todayISO;
  const savedRegister = registers[selectedDate] || {};
  const savedCount = Object.keys(savedRegister).length;

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

  // Statuses for the stats cards: unsaved marks on today, saved register on past days.
  const effectiveMarks = isToday ? marks : savedRegister;
  const averageAttendance = averageOf(students, 'attendance');
  const markedCount = Object.keys(effectiveMarks).length;
  const presentCount = Object.values(effectiveMarks).filter((status) => status === 'present').length;
  const absentCount = Object.values(effectiveMarks).filter((status) => status === 'absent').length;

  // Warn before navigating away with unsaved marks.
  const unsavedCount = Object.keys(marks).length;
  const blocker = useBlocker(unsavedCount > 0);

  const setStatus = (studentId, status) => {
    if (!isToday) return;
    setMarks((prev) => ({ ...prev, [studentId]: status }));
  };

  const applyAttendance = () => {
    schoolData.saveAttendance(selectedDate, marks);
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

  const changeDate = (date) => {
    setSelectedDate(date);
    setMarks({});
  };

  const statusOf = (studentId) => (
    isToday
      ? (marks[studentId] ?? savedRegister[studentId])
      : savedRegister[studentId]
  );

  const recentHistory = useMemo(() => {
    if (!selectedStudent) return [];
    return Object.entries(registers)
      .filter(([, register]) => register[selectedStudent.id])
      .map(([date, register]) => ({ date, status: register[selectedStudent.id] }))
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 5);
  }, [registers, selectedStudent]);

  return (
    <div className="attendance-page">
      <Header
        title="Attendance"
        subtitle={isToday
          ? `${visibleStudents.length} students ready for today's register`
          : `Register for ${formatDate(selectedDate)} (read-only)`}
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
          note={isToday ? 'Marked as present' : `Present on ${formatDate(selectedDate)}`}
          title="Present"
          value={presentCount.toLocaleString()}
        />
        <StatsCard
          icon={<FiUserX />}
          note={isToday ? 'Marked as absent' : `Absent on ${formatDate(selectedDate)}`}
          title="Absent"
          value={absentCount.toLocaleString()}
        />
        <StatsCard
          icon={<FiClock />}
          note={isToday ? 'Unsaved marks' : 'Saved in register'}
          title={isToday ? 'Marked Today' : 'Recorded'}
          value={markedCount.toLocaleString()}
        />
      </div>

      <div className="table-container">
        <div className="table-top attendance-toolbar">
          <SearchBar value={search} onChange={setSearch} placeholder="Search students" />
          <input
            aria-label="Register date"
            className="date-input"
            max={todayISO}
            type="date"
            value={selectedDate}
            onChange={(event) => event.target.value && changeDate(event.target.value)}
          />
          <select value={classFilter} onChange={(event) => setClassFilter(event.target.value)}>
            <option value="all">All classes</option>
            {classes.map((className) => (
              <option key={className} value={className}>{className}</option>
            ))}
          </select>
          <button className="btn secondary" type="button" onClick={() => markVisible('present')} disabled={!isToday}>
            <FiCheckCircle />Mark Visible Present
          </button>
          <button className="btn primary" type="button" onClick={applyAttendance} disabled={!isToday || !markedCount}>
            Save Attendance
          </button>
        </div>

        <div className="attendance-results-bar">
          <span><FiSearch />Showing {visibleStudents.length} of {students.length}</span>
          <span>
            {isToday
              ? (markedCount ? `${markedCount} marks waiting to save` : savedCount ? `${savedCount} saved for today` : 'No unsaved marks')
              : (savedCount ? `${savedCount} records saved` : 'No register saved for this date')}
          </span>
        </div>

        <div className="table-wrapper">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Class</th>
                <th>Current Attendance</th>
                <th>{isToday ? 'Today' : formatDate(selectedDate)}</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleStudents.length === 0 ? (
                <tr>
                  <td className="table-empty" colSpan={5}>
                    {students.length
                      ? 'No students match your filters.'
                      : 'No students yet. Add one to get started.'}
                  </td>
                </tr>
              ) : (
                visibleStudents.map((student) => {
                  const status = statusOf(student.id);
                  return (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      <td>{student.class}</td>
                      <td>{Number.isFinite(student.attendance) ? `${student.attendance}%` : 'N/A'}</td>
                      <td>
                        <div className="attendance-mark-group" aria-label={`Mark attendance for ${student.name}`}>
                          {Object.keys(STATUS_LABEL).map((key) => (
                            <button
                              className={`attendance-mark ${status === key ? 'active' : ''}`}
                              key={key}
                              type="button"
                              aria-pressed={status === key}
                              disabled={!isToday}
                              onClick={() => setStatus(student.id, key)}
                            >
                              {STATUS_LABEL[key]}
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
                  );
                })
              )}
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

            <div className="attendance-history">
              <h4>Recent attendance</h4>
              {recentHistory.length === 0 ? (
                <p className="muted">No saved registers include this student yet.</p>
              ) : (
                <ul>
                  {recentHistory.map((entry) => (
                    <li key={entry.date}>
                      <span>{formatDate(entry.date)}</span>
                      <strong className={`status-pill status-${entry.status}`}>{STATUS_LABEL[entry.status]}</strong>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        </div>
      )}
    </div>
  );
}
