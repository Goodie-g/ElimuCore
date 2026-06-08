import Header from '../components/Header';
import StatsCard from '../components/StatsCard';

export default function Dashboard() {
  return (
    <div className='stats-section'>
      <Header title="Dashboard" showButtons />

      <div className="stats-grid">
        <StatsCard title="Total Students" value="1,250" />
        <StatsCard title="Total Teachers" value="75" />
        <StatsCard title="Attendance" value="92%" />
      </div>
    </div>
  );
}