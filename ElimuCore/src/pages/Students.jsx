import { useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import TableActions from '../components/TableActions';

export default function Students({ schoolData }) {
  const students = schoolData?.students ?? [];
  const [search, setSearch] = useState('');
  const query = search.trim().toLowerCase();
  const visibleStudents = students.filter((student) =>
    [student.name, student.class, student.stream, student.division]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(query))
  );

  return (
    <div>
      <Header title="Students" subtitle={`${visibleStudents.length} of ${students.length} students shown`} />

      <div className="table-container">
        <div className="table-top">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Class</th>
                <th>Stream</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {visibleStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.class}</td>
                  <td>{student.stream || 'N/A'}</td>
                  <td>
                    <TableActions />
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
