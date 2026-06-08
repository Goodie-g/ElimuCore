import React from 'react'

export default function TeacherForm({ onSubmit }) {
	return (
		<form onSubmit={(e) => { e.preventDefault(); onSubmit && onSubmit() }}>
			<div>
				<label>Name</label>
				<input name="name" />
			</div>
			<div>
				<label>Subject</label>
				<input name="subject" />
			</div>
			<button type="submit" className="btn primary">Add Teacher</button>
		</form>
	)
}
