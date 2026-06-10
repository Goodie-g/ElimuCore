import { useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import TableActions from '../components/TableActions';

const SORT_OPTIONS = [
  { value: 'name', label: 'Name' },
  { value: 'gender', label: 'Gender' },
  { value: 'class', label: 'Class' },
  { value: 'average', label: 'Average' },
  { value: 'attendance', label: 'Attendance' },
  { value: 'division', label: 'Division' },
];

function sortStudents(students, sortBy) {
  return [...students].sort((a, b) => {
    if (sortBy === 'average' || sortBy === 'attendance') {
      return (b[sortBy] ?? -1) - (a[sortBy] ?? -1);
    }

    return (a[sortBy] || '').localeCompare(b[sortBy] || '', undefined, { numeric: true });
  });
}

export default function Students({ schoolData }) {
  const students = schoolData?.students ?? [];
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const query = search.trim().toLowerCase();
  const visibleStudents = sortStudents(students.filter((student) =>
    [student.name, student.gender, student.class, student.division]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(query))
  ), sortBy);

  return (
    <div>
      <Header title="Students" subtitle={`${visibleStudents.length} of ${students.length} students shown`} />

      <div className="table-container">
        <div className="table-top people-toolbar">
          <SearchBar value={search} onChange={setSearch} />
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                Sort: {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Class</th>
                <th>Attendance</th>
                <th>Average</th>
                <th>Division</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {visibleStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.gender || 'N/A'}</td>
                  <td>{student.class}</td>
                  <td>{Number.isFinite(student.attendance) ? `${student.attendance}%` : 'N/A'}</td>
                  <td>{Number.isFinite(student.average) ? student.average.toFixed(1) : 'N/A'}</td>
                  <td>{student.division || 'N/A'}</td>
                  <td>
                    <TableActions
                      onEdit={() => schoolData.openEditStudent(student)}
                      onDelete={() => schoolData.deleteStudent(student.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
