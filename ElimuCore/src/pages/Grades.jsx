import Header from '../components/Header';

export default function Grades() {
  return (
    <div>
      <Header title="Grades" />

      <div className="grades-container">
        <div className="grade-card">
          <h3>Form 1</h3>
          <p>Average Grade: B</p>
        </div>

        <div className="grade-card">
          <h3>Form 2</h3>
          <p>Average Grade: A</p>
        </div>

        <div className="grade-card">
          <h3>Form 3</h3>
          <p>Average Grade: C+</p>
        </div>
      </div>
    </div>
  );
}