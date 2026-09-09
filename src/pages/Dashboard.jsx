import { useNavigate, useOutletContext } from 'react-router-dom';
import Header from '../components/Header';
import StatsCard from '../components/StatsCard';
import { FiAward, FiBookOpen, FiTrendingUp, FiUsers } from 'react-icons/fi';

function averageOf(students, field) {
  const values = students
    .map((student) => student[field])
    .filter((value) => Number.isFinite(value));

  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export default function Dashboard() {
  const schoolData = useOutletContext();
  const navigate = useNavigate();
  const students = schoolData?.students ?? [];
  const teachers = schoolData?.teachers ?? [];
  const averageAttendance = averageOf(students, 'attendance');
  const schoolAverage = averageOf(students, 'average');
  const topStudents = [...students]
    .filter((student) => Number.isFinite(student.average))
    .sort((a, b) => b.average - a.average)
    .slice(0, 5);

  return (
    <div className="dashboard-page">
      <Header
        title="Dashboard"
        subtitle="Live school overview from the current student dataset"
      />

      <div className="stats-flex">
        <StatsCard
          icon={<FiUsers />}
          note="Dataset records"
          title="Total Students"
          value={students.length.toLocaleString()}
        />
        <StatsCard
          icon={<FiBookOpen />}
          note="Active staff records"
          title="Total Teachers"
          value={teachers.length.toLocaleString()}
        />
        <StatsCard
          icon={<FiTrendingUp />}
          note="Across all students"
          title="Attendance"
          value={`${averageAttendance.toFixed(1)}%`}
          onClick={() => navigate('/attendance')}
        />
        <StatsCard
          icon={<FiAward />}
          note="Overall mean score"
          title="School Average"
          value={schoolAverage.toFixed(1)}
        />
      </div>

      <div className="dashboard-grid">
        <section className="performance-panel">
          <div className="panel-heading">
            <div>
              <span>Top performers</span>
              <h3>Best Performing Students</h3>
            </div>
            <FiAward aria-hidden="true" />
          </div>

          <div className="top-students-list">
            {topStudents.map((student, index) => (
              <article className="top-student-row" key={student.id}>
                <div className="rank">{index + 1}</div>
                <div className="student-summary">
                  <strong>{student.name}</strong>
                  <span>{student.class} - Division {student.division}</span>
                </div>
                <div className="score-pill">{student.average.toFixed(1)}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="class-overview-panel">
          <div className="panel-heading">
            <div>
              <span>Class balance</span>
              <h3>Students by Class</h3>
            </div>
          </div>

          <div className="class-bars">
            {[...new Set(students.map((student) => student.class).filter(Boolean))]
              .sort()
              .map((className) => {
                const count = students.filter((student) => student.class === className).length;
                const percent = students.length ? (count / students.length) * 100 : 0;

                return (
                  <div className="class-bar-row" key={className}>
                    <div>
                      <strong>{className}</strong>
                      <span>{count} students</span>
                    </div>
                    <div className="class-bar-track">
                      <div className="class-bar-fill" style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
      </div>
    </div>
  );
}
