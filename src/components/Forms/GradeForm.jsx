import { useState } from 'react'
import { gradeForScore } from '../../utils/grades'

export default function GradeForm({ student, onSubmit, onCancel }) {
	const [error, setError] = useState('')
	const subjects = Object.keys(student?.subjects ?? {})

	const handleSubmit = (e) => {
		e.preventDefault()
		const formData = new FormData(e.target)
		const scores = {}
		for (const subject of subjects) {
			const value = formData.get(subject)
			scores[subject] = value === '' || value === null ? NaN : Number(value)
		}

		const result = onSubmit?.(student.id, scores)
		setError(result?.error ?? '')
	}

	return (
		<form className="form" onSubmit={handleSubmit}>
			{error && <p className="form-error">{error}</p>}
			{subjects.length === 0 ? (
				<p className="muted">This student has no subjects to edit.</p>
			) : (
				<div className="grade-form-grid">
					{subjects.map((subject) => (
						<div className="form-field" key={subject}>
							<label htmlFor={`grade-${subject}`}>{subject}</label>
							<div className="grade-input-row">
								<input
									id={`grade-${subject}`}
									name={subject}
									type="number"
									min="0"
									max="100"
									step="1"
									defaultValue={student.subjects[subject]?.score ?? ''}
									required
								/>
								<span className="grade-letter-preview" aria-hidden="true">
									{gradeForScore(student.subjects[subject]?.score ?? 0)}
								</span>
							</div>
						</div>
					))}
				</div>
			)}
			<div className="form-actions">
				<button type="button" className="btn secondary" onClick={onCancel}>Cancel</button>
				{subjects.length > 0 && (
					<button type="submit" className="btn primary">Save Grades</button>
				)}
			</div>
		</form>
	)
}
