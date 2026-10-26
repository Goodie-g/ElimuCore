export default function SearchBar({ value, onChange, placeholder = 'Search...' }) {
	return (
		<input
			className="search-input"
			type="text"
			placeholder={placeholder}
			aria-label={placeholder}
			value={value || ''}
			onChange={(e) => onChange && onChange(e.target.value)}
		/>
	)
}
