import React from 'react'

export default function StatsCard({ title, value, icon }) {
  return (
    <div className="stats-card">
      <h4>{title}</h4>
      <p>{value}</p>
      <div>{ icon }</div>
    </div>
  )
}
