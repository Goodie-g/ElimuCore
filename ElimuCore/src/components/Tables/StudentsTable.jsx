import React from 'react'

export default function StudentsTable({ students = [] }) {
	return (
		<table className="students-table">
			<thead>
				<tr>
					<th>Name</th>
					<th>Class</th>
					<th>Stream</th>
				</tr>
			</thead>
			<tbody>
				{students.map((s) => (
					<tr key={s.id}>
						<td>{s.name}</td>
						<td>{s.class}</td>
						<td>{s.stream}</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
