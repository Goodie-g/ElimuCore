import React from 'react'

export default function TeachersTable({ teachers = [] }) {
	return (
		<table className="teachers-table">
			<thead>
				<tr>
					<th>Name</th>
					<th>Subject</th>
					<th>Class</th>
				</tr>
			</thead>
			<tbody>
				{teachers.map((t) => (
					<tr key={t.id}>
						<td>{t.name}</td>
						<td>{t.subject}</td>
						<td>{t.class}</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
