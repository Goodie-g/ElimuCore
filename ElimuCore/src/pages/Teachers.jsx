import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import TableActions from '../components/TableActions';
import { teachers } from '../data/mockData';

export default function Teachers() {
  return (
    <div>
      <Header title="Teachers" />

      <div className="table-container">
        <div className="table-top">
          <SearchBar />
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
              {teachers.map((teacher) => (
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