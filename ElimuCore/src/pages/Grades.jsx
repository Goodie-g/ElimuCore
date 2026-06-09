import { useMemo, useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

const SORT_OPTIONS = [
  { value: 'name', label: 'Name' },
  { value: 'average', label: 'Average' },
  { value: 'attendance', label: 'Attendance' },
  { value: 'division', label: 'Division' },
  { value: 'subject', label: 'Selected subject' },
];

function getSubjectNames(students) {
  const subjects = new Set();
  students.forEach((student) => {
    Object.keys(student.subjects || {}).forEach((subject) => subjects.add(subject));
  });
  return [...subjects].sort();
}

function getClassSummaries(students) {
  const grouped = students.reduce((groups, student) => {
    const className = student.class || 'Unassigned';
    groups[className] = [...(groups[className] || []), student];
    return groups;
  }, {});

  return Object.entries(grouped)
    .map(([className, classStudents]) => {
      const gradedStudents = classStudents.filter((student) => Number.isFinite(student.average));
      const totalAverage = gradedStudents.reduce((sum, student) => sum + student.average, 0);
      const bestAverage = gradedStudents.reduce(
        (best, student) => Math.max(best, student.average),
        0
      );
      const divisionCounts = classStudents.reduce((counts, student) => {
        if (!student.division) return counts;
        counts[student.division] = (counts[student.division] || 0) + 1;
        return counts;
      }, {});
      const topDivision =
        Object.entries(divisionCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

      return {
        className,
        count: classStudents.length,
        average: gradedStudents.length ? (totalAverage / gradedStudents.length).toFixed(1) : 'N/A',
        bestAverage: gradedStudents.length ? bestAverage.toFixed(1) : 'N/A',
        topDivision,
      };
    })
    .sort((a, b) => a.className.localeCompare(b.className, undefined, { numeric: true }));
}

function sortStudents(students, sortBy, selectedSubject) {
  return [...students].sort((a, b) => {
    if (sortBy === 'name') return (a.name || '').localeCompare(b.name || '');
    if (sortBy === 'division') return (a.division || 'zzz').localeCompare(b.division || 'zzz');

    const getValue = (student) => {
      if (sortBy === 'subject') return student.subjects?.[selectedSubject]?.score ?? -1;
      return student[sortBy] ?? -1;
    };

    return getValue(b) - getValue(a);
  });
}

export default function Grades({ schoolData }) {
  const students = useMemo(() => schoolData?.students ?? [], [schoolData?.students]);
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [sortBy, setSortBy] = useState('average');
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const subjects = useMemo(() => getSubjectNames(students), [students]);
  const activeSubject = selectedSubject || subjects[0] || '';

  const classes = useMemo(
    () => [...new Set(students.map((student) => student.class).filter(Boolean))].sort(),
    [students]
  );

  const classSummaries = useMemo(() => getClassSummaries(students), [students]);

  const visibleStudents = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = students.filter((student) => {
      const matchesSearch = !query || student.name?.toLowerCase().includes(query);
      const matchesClass = selectedClass === 'all' || student.class === selectedClass;
      return matchesSearch && matchesClass;
    });

    return sortStudents(filtered, sortBy, activeSubject);
  }, [activeSubject, search, selectedClass, sortBy, students]);

  const selectedStudent = visibleStudents.find((student) => student.id === selectedStudentId);

  return (
    <div>
      <Header title="Grades" />

      <div className="grades-container">
        {classSummaries.map((summary) => (
          <button
            className={`grade-card ${selectedClass === summary.className ? 'active' : ''}`}
            key={summary.className}
            onClick={() =>
              setSelectedClass((current) =>
                current === summary.className ? 'all' : summary.className
              )
            }
            type="button"
          >
            <span>{summary.count} students</span>
            <h3>{summary.className}</h3>
            <p>Class average: {summary.average}</p>
            <p>Best average: {summary.bestAverage}</p>
            <p>Common division: {summary.topDivision}</p>
          </button>
        ))}
      </div>

      <div className="table-container grades-table-container">
        <div className="table-top grades-toolbar">
          <SearchBar value={search} onChange={setSearch} />

          <select value={selectedClass} onChange={(event) => setSelectedClass(event.target.value)}>
            <option value="all">All classes</option>
            {classes.map((className) => (
              <option key={className} value={className}>
                {className}
              </option>
            ))}
          </select>

          <select value={activeSubject} onChange={(event) => setSelectedSubject(event.target.value)}>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>

          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                Sort: {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grades-results-bar">
          Showing {visibleStudents.length} of {students.length} students
        </div>

        <div className="table-wrapper">
          <table className="grades-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Class</th>
                <th>Attendance</th>
                <th>Average</th>
                <th>Division</th>
                <th>{activeSubject || 'Subject'}</th>
                <th>Details</th>
              </tr>
            </thead>

            <tbody>
              {visibleStudents.map((student) => {
                const subjectResult = student.subjects?.[activeSubject];
                const isSelected = selectedStudentId === student.id;

                return (
                  <tr key={student.id} className={isSelected ? 'selected-row' : ''}>
                    <td>{student.name}</td>
                    <td>{student.class || 'N/A'}</td>
                    <td>{Number.isFinite(student.attendance) ? `${student.attendance}%` : 'N/A'}</td>
                    <td>{Number.isFinite(student.average) ? student.average.toFixed(1) : 'N/A'}</td>
                    <td>{student.division || 'N/A'}</td>
                    <td>
                      {subjectResult
                        ? `${subjectResult.score} (${subjectResult.grade})`
                        : 'N/A'}
                    </td>
                    <td>
                      <button
                        className="btn secondary"
                        onClick={() =>
                          setSelectedStudentId((current) =>
                            current === student.id ? null : student.id
                          )
                        }
                        type="button"
                      >
                        {isSelected ? 'Hide' : 'View'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {selectedStudent && (
          <div className="student-grade-details">
            <div>
              <h3>{selectedStudent.name}</h3>
              <p>
                {selectedStudent.class || 'N/A'} - Average{' '}
                {Number.isFinite(selectedStudent.average)
                  ? selectedStudent.average.toFixed(1)
                  : 'N/A'}{' '}
                - Division {selectedStudent.division || 'N/A'}
              </p>
            </div>

            <div className="subject-grid">
              {Object.entries(selectedStudent.subjects || {}).map(([subject, result]) => (
                <div className="subject-score" key={subject}>
                  <span>{subject}</span>
                  <strong>
                    {result.score} ({result.grade})
                  </strong>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
