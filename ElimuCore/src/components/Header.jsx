import React from 'react'

export default function Header({ title, showButtons }) {
  return (
    <header className="app-header">
      <h2>{title}</h2>
      {showButtons && (
        <div className="header-actions">
        </div>
      )}
    </header>
  )
}
