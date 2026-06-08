import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import TableActions from '../components/TableActions';
import { students } from '../data/mockData';

export default function Students() {
  return (
    <div>
      <Header title="Students" />

      <div className="table-container">
        <div className="table-top">
          <SearchBar />
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
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.class}</td>
                  <td>{student.stream}</td>
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