import { useState } from 'react'
import {
	CLASS_OPTIONS,
	DIVISION_OPTIONS,
	GENDER_OPTIONS,
	getFormNumber,
	validateStudent,
} from '../../utils/schoolValidation'

export default function StudentForm({ initialValues = {}, isEditing = false, onSubmit, onCancel }) {
	const [error, setError] = useState('')
	const values = initialValues ?? {}

	const handleSubmit = (e) => {
		e.preventDefault()
		const formData = new FormData(e.target)
		const student = {
			name: formData.get('name')?.trim() ?? '',
			gender: formData.get('gender')?.trim() ?? '',
			class: formData.get('class')?.trim() ?? '',
			attendance: getFormNumber(formData, 'attendance'),
			average: getFormNumber(formData, 'average'),
			division: formData.get('division')?.trim() ?? '',
		}

		const validationError = validateStudent(student)
		if (validationError) {
			setError(validationError)
			return
		}

		const result = onSubmit?.(student)
		setError(result?.error ?? '')
	}

	return (
		<form className="form" onSubmit={handleSubmit}>
			{error && <p className="form-error">{error}</p>}
			<div className="form-field">
				<label htmlFor="student-name">Name</label>
				<input id="student-name" name="name" defaultValue={values.name ?? ''} required />
			</div>
			<div className="form-field">
				<label htmlFor="student-gender">Gender</label>
				<select id="student-gender" name="gender" defaultValue={values.gender ?? 'Female'} required>
					{GENDER_OPTIONS.map((gender) => (
						<option key={gender} value={gender}>{gender}</option>
					))}
				</select>
			</div>
			<div className="form-field">
				<label htmlFor="student-class">Class</label>
				<select id="student-class" name="class" defaultValue={values.class ?? 'Form 1'} required>
					{CLASS_OPTIONS.map((className) => (
						<option key={className} value={className}>{className}</option>
					))}
				</select>
			</div>
			<div className="form-field">
				<label htmlFor="student-attendance">Attendance</label>
				<input
					id="student-attendance"
					name="attendance"
					type="number"
					min="0"
					max="100"
					step="1"
					defaultValue={values.attendance ?? 0}
					required
				/>
			</div>
			<div className="form-field">
				<label htmlFor="student-average">Average</label>
				<input
					id="student-average"
					name="average"
					type="number"
					min="0"
					max="100"
					step="0.1"
					defaultValue={values.average ?? 0}
					required
				/>
			</div>
			<div className="form-field">
				<label htmlFor="student-division">Division</label>
				<select id="student-division" name="division" defaultValue={values.division ?? 'III'} required>
					{DIVISION_OPTIONS.map((division) => (
						<option key={division} value={division}>{division}</option>
					))}
				</select>
			</div>
			<div className="form-actions">
				<button type="button" className="btn secondary" onClick={onCancel}>Cancel</button>
				<button type="submit" className="btn primary">{isEditing ? 'Save Student' : 'Add Student'}</button>
			</div>
		</form>
	)
}
