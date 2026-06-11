export default function StatsCard({ title, value, icon, note, onClick }) {
  const CardTag = onClick ? 'button' : 'div'

  return (
    <CardTag className={`stats-card${onClick ? ' stats-card--clickable' : ''}`} type={onClick ? 'button' : undefined} onClick={onClick}>
      <div className="stats-card-icon">{icon}</div>
      <div>
        <h4>{title}</h4>
        <p>{value}</p>
        {note && <span>{note}</span>}
      </div>
    </CardTag>
  )
}
