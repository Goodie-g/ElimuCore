export default function TeacherForm({ onSubmit, onCancel }) {
	const handleSubmit = (e) => {
		e.preventDefault()
		const formData = new FormData(e.target)
		onSubmit?.({
			name: formData.get('name')?.trim() ?? '',
			subject: formData.get('subject')?.trim() ?? '',
			class: formData.get('class')?.trim() ?? '',
		})
	}

	return (
		<form className="form" onSubmit={handleSubmit}>
			<div className="form-field">
				<label htmlFor="teacher-name">Name</label>
				<input id="teacher-name" name="name" required />
			</div>
			<div className="form-field">
				<label htmlFor="teacher-subject">Subject</label>
				<input id="teacher-subject" name="subject" required />
			</div>
			<div className="form-field">
				<label htmlFor="teacher-class">Class</label>
				<input id="teacher-class" name="class" required />
			</div>
			<div className="form-actions">
				<button type="button" className="btn secondary" onClick={onCancel}>Cancel</button>
				<button type="submit" className="btn primary">Add Teacher</button>
			</div>
		</form>
	)
}
