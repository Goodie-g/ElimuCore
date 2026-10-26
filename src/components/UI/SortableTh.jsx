import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

export default function SortableTh({ column, label, sortBy, sortDir, onSort }) {
	const active = sortBy === column

	return (
		<th aria-sort={active ? (sortDir === 'asc' ? 'ascending' : 'descending') : undefined}>
			<button className={`th-sort${active ? ' active' : ''}`} type="button" onClick={() => onSort(column)}>
				{label}
				{active && (sortDir === 'asc'
					? <FiChevronUp aria-hidden="true" />
					: <FiChevronDown aria-hidden="true" />)}
			</button>
		</th>
	)
}
