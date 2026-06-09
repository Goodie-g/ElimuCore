import { useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import TableActions from '../components/TableActions';

export default function Teachers({ schoolData }) {
  const teachers = schoolData?.teachers ?? [];
  const [search, setSearch] = useState('');
  const query = search.trim().toLowerCase();
  const visibleTeachers = teachers.filter((teacher) =>
    [teacher.name, teacher.subject, teacher.class]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(query))
  );

  return (
    <div>
      <Header title="Teachers" subtitle={`${visibleTeachers.length} of ${teachers.length} teachers shown`} />

      <div className="table-container">
        <div className="table-top">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Subject</th>
                <th>Class</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {visibleTeachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td>{teacher.name}</td>
                  <td>{teacher.subject}</td>
                  <td>{teacher.class}</td>
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
