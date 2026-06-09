export default function StatsCard({ title, value, icon, note }) {
  return (
    <div className="stats-card">
      <div className="stats-card-icon">{icon}</div>
      <div>
        <h4>{title}</h4>
        <p>{value}</p>
        {note && <span>{note}</span>}
      </div>
    </div>
  )
}
