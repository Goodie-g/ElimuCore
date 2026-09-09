import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import SortableTh from '../components/UI/SortableTh';
import TableActions from '../components/TableActions';

const COLUMNS = [
  { key: 'name', label: 'Name' },
  { key: 'gender', label: 'Gender' },
  { key: 'class', label: 'Class' },
  { key: 'attendance', label: 'Attendance' },
  { key: 'average', label: 'Average' },
  { key: 'division', label: 'Division' },
];

const NUMERIC_COLUMNS = new Set(['attendance', 'average']);

function sortStudents(students, sortBy, sortDir) {
  const direction = sortDir === 'asc' ? 1 : -1;

  return [...students].sort((a, b) => {
    if (NUMERIC_COLUMNS.has(sortBy)) {
      return ((a[sortBy] ?? -1) - (b[sortBy] ?? -1)) * direction;
    }

    return (a[sortBy] || '').localeCompare(b[sortBy] || '', undefined, { numeric: true }) * direction;
  });
}

export default function Students() {
  const schoolData = useOutletContext();
  const students = schoolData?.students ?? [];
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const query = search.trim().toLowerCase();
  const visibleStudents = sortStudents(students.filter((student) =>
    [student.name, student.gender, student.class, student.division]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(query))
  ), sortBy, sortDir);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDir((current) => (current === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(column);
      setSortDir(NUMERIC_COLUMNS.has(column) ? 'desc' : 'asc');
    }
  };

  return (
    <div>
      <Header title="Students" subtitle={`${visibleStudents.length} of ${students.length} students shown`} />

      <div className="table-container">
        <div className="table-top people-toolbar">
          <SearchBar value={search} onChange={setSearch} placeholder="Search students" />
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                {COLUMNS.map((column) => (
                  <SortableTh
                    key={column.key}
                    column={column.key}
                    label={column.label}
                    sortBy={sortBy}
                    sortDir={sortDir}
                    onSort={handleSort}
                  />
                ))}
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {visibleStudents.length === 0 ? (
                <tr>
                  <td className="table-empty" colSpan={COLUMNS.length + 1}>
                    {students.length
                      ? 'No students match your search.'
                      : 'No students yet. Add one to get started.'}
                  </td>
                </tr>
              ) : (
                visibleStudents.map((student) => (
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
