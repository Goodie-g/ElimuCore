import React from 'react'

export default function StudentForm({ onSubmit }) {
	return (
		<form onSubmit={(e) => { e.preventDefault(); onSubmit && onSubmit() }}>
			<div>
				<label>Name</label>
				<input name="name" />
			</div>
			<div>
				<label>Class</label>
				<input name="class" />
			</div>
			<button type="submit" className="btn primary">Add Student</button>
		</form>
	)
}
