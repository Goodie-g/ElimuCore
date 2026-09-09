import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import SortableTh from '../components/UI/SortableTh';
import TableActions from '../components/TableActions';

const COLUMNS = [
  { key: 'name', label: 'Name' },
  { key: 'gender', label: 'Gender' },
  { key: 'subject', label: 'Subject' },
  { key: 'class', label: 'Class' },
  { key: 'experience', label: 'Experience' },
  { key: 'qualification', label: 'Qualification' },
  { key: 'email', label: 'Email' },
];

const NUMERIC_COLUMNS = new Set(['experience']);

function sortTeachers(teachers, sortBy, sortDir) {
  const direction = sortDir === 'asc' ? 1 : -1;

  return [...teachers].sort((a, b) => {
    if (NUMERIC_COLUMNS.has(sortBy)) {
      return ((a[sortBy] ?? -1) - (b[sortBy] ?? -1)) * direction;
    }

    return (a[sortBy] || '').localeCompare(b[sortBy] || '', undefined, { numeric: true }) * direction;
  });
}

export default function Teachers() {
  const schoolData = useOutletContext();
  const teachers = schoolData?.teachers ?? [];
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const query = search.trim().toLowerCase();
  const visibleTeachers = sortTeachers(teachers.filter((teacher) =>
    [teacher.name, teacher.subject, teacher.class, teacher.qualification, teacher.email]
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
      <Header title="Teachers" subtitle={`${visibleTeachers.length} of ${teachers.length} teachers shown`} />

      <div className="table-container">
        <div className="table-top people-toolbar">
          <SearchBar value={search} onChange={setSearch} placeholder="Search teachers" />
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
              {visibleTeachers.length === 0 ? (
                <tr>
                  <td className="table-empty" colSpan={COLUMNS.length + 1}>
                    {teachers.length
                      ? 'No teachers match your search.'
                      : 'No teachers yet. Add one to get started.'}
                  </td>
                </tr>
              ) : (
                visibleTeachers.map((teacher) => (
                  <tr key={teacher.id}>
                    <td>{teacher.name}</td>
                    <td>{teacher.gender || 'N/A'}</td>
                    <td>{teacher.subject}</td>
                    <td>{teacher.class}</td>
                    <td>{Number.isFinite(teacher.experience) ? `${teacher.experience} years` : 'N/A'}</td>
                    <td>{teacher.qualification || 'N/A'}</td>
                    <td>{teacher.email || 'N/A'}</td>
                    <td>
                      <TableActions
                        onEdit={() => schoolData.openEditTeacher(teacher)}
                        onDelete={() => schoolData.deleteTeacher(teacher.id)}
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
