export default function StudentForm({ onSubmit, onCancel }) {
	const handleSubmit = (e) => {
		e.preventDefault()
		const formData = new FormData(e.target)
		onSubmit?.({
			name: formData.get('name')?.trim() ?? '',
			class: formData.get('class')?.trim() ?? '',
			stream: formData.get('stream')?.trim() ?? '',
		})
	}

	return (
		<form className="form" onSubmit={handleSubmit}>
			<div className="form-field">
				<label htmlFor="student-name">Name</label>
				<input id="student-name" name="name" required />
			</div>
			<div className="form-field">
				<label htmlFor="student-class">Class</label>
				<input id="student-class" name="class" required />
			</div>
			<div className="form-field">
				<label htmlFor="student-stream">Stream</label>
				<input id="student-stream" name="stream" required />
			</div>
			<div className="form-actions">
				<button type="button" className="btn secondary" onClick={onCancel}>Cancel</button>
				<button type="submit" className="btn primary">Add Student</button>
			</div>
		</form>
	)
}
