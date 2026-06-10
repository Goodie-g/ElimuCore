import { useState } from 'react'
import {
	CLASS_OPTIONS,
	GENDER_OPTIONS,
	getFormNumber,
	validateTeacher,
} from '../../utils/schoolValidation'

export default function TeacherForm({ initialValues = {}, isEditing = false, onSubmit, onCancel }) {
	const [error, setError] = useState('')
	const values = initialValues ?? {}

	const handleSubmit = (e) => {
		e.preventDefault()
		const formData = new FormData(e.target)
		const teacher = {
			name: formData.get('name')?.trim() ?? '',
			gender: formData.get('gender')?.trim() ?? '',
			subject: formData.get('subject')?.trim() ?? '',
			class: formData.get('class')?.trim() ?? '',
			experience: getFormNumber(formData, 'experience'),
			qualification: formData.get('qualification')?.trim() ?? '',
			email: formData.get('email')?.trim() ?? '',
		}

		const validationError = validateTeacher(teacher)
		if (validationError) {
			setError(validationError)
			return
		}

		const result = onSubmit?.(teacher)
		setError(result?.error ?? '')
	}

	return (
		<form className="form" onSubmit={handleSubmit}>
			{error && <p className="form-error">{error}</p>}
			<div className="form-field">
				<label htmlFor="teacher-name">Name</label>
				<input id="teacher-name" name="name" defaultValue={values.name ?? ''} required />
			</div>
			<div className="form-field">
				<label htmlFor="teacher-gender">Gender</label>
				<select id="teacher-gender" name="gender" defaultValue={values.gender ?? 'Female'} required>
					{GENDER_OPTIONS.map((gender) => (
						<option key={gender} value={gender}>{gender}</option>
					))}
				</select>
			</div>
			<div className="form-field">
				<label htmlFor="teacher-subject">Subject</label>
				<input id="teacher-subject" name="subject" defaultValue={values.subject ?? ''} required />
			</div>
			<div className="form-field">
				<label htmlFor="teacher-class">Class</label>
				<select id="teacher-class" name="class" defaultValue={values.class ?? 'Form 1'} required>
					{CLASS_OPTIONS.map((className) => (
						<option key={className} value={className}>{className}</option>
					))}
				</select>
			</div>
			<div className="form-field">
				<label htmlFor="teacher-experience">Experience</label>
				<input
					id="teacher-experience"
					name="experience"
					type="number"
					min="0"
					step="1"
					defaultValue={values.experience ?? 0}
					required
				/>
			</div>
			<div className="form-field">
				<label htmlFor="teacher-qualification">Qualification</label>
				<input
					id="teacher-qualification"
					name="qualification"
					defaultValue={values.qualification ?? ''}
					required
				/>
			</div>
			<div className="form-field">
				<label htmlFor="teacher-email">Email</label>
				<input id="teacher-email" name="email" type="email" defaultValue={values.email ?? ''} required />
			</div>
			<div className="form-actions">
				<button type="button" className="btn secondary" onClick={onCancel}>Cancel</button>
				<button type="submit" className="btn primary">{isEditing ? 'Save Teacher' : 'Add Teacher'}</button>
			</div>
		</form>
	)
}
