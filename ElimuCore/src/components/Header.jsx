export default function Header({ title, subtitle }) {
  return (
    <header className="app-header">
      <div>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </header>
  )
}
