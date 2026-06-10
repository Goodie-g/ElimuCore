import { useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import TableActions from '../components/TableActions';

const SORT_OPTIONS = [
  { value: 'name', label: 'Name' },
  { value: 'gender', label: 'Gender' },
  { value: 'subject', label: 'Subject' },
  { value: 'class', label: 'Class' },
  { value: 'experience', label: 'Experience' },
  { value: 'qualification', label: 'Qualification' },
  { value: 'email', label: 'Email' },
];

function sortTeachers(teachers, sortBy) {
  return [...teachers].sort((a, b) => {
    if (sortBy === 'experience') return (b.experience ?? -1) - (a.experience ?? -1);
    return (a[sortBy] || '').localeCompare(b[sortBy] || '', undefined, { numeric: true });
  });
}

export default function Teachers({ schoolData }) {
  const teachers = schoolData?.teachers ?? [];
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const query = search.trim().toLowerCase();
  const visibleTeachers = sortTeachers(teachers.filter((teacher) =>
    [teacher.name, teacher.subject, teacher.class, teacher.qualification, teacher.email]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(query))
  ), sortBy);

  return (
    <div>
      <Header title="Teachers" subtitle={`${visibleTeachers.length} of ${teachers.length} teachers shown`} />

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
                <th>Subject</th>
                <th>Class</th>
                <th>Experience</th>
                <th>Qualification</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {visibleTeachers.map((teacher) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
