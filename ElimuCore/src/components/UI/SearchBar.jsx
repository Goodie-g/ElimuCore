import React from 'react'

export default function SearchBar({ value, onChange }) {
	return (
		<input
			className="search-input"
			type="text"
			placeholder="Search..."
			value={value || ''}
			onChange={(e) => onChange && onChange(e.target.value)}
		/>
	)
}
