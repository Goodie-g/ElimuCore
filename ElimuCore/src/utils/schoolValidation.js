export const CLASS_OPTIONS = ['Form 1', 'Form 2', 'Form 3', 'Form 4']
export const GENDER_OPTIONS = ['Female', 'Male']
export const DIVISION_OPTIONS = ['I', 'II', 'III', 'IV', '0']

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function getFormNumber(formData, key) {
	const value = formData.get(key)
	return value === '' || value === null ? null : Number(value)
}

export function validateStudent(student) {
	if (!student.name?.trim()) return 'Please enter the student name.'
	if (!GENDER_OPTIONS.includes(student.gender)) return 'Please choose a valid gender.'
	if (!CLASS_OPTIONS.includes(student.class)) return 'Please enter the correct class: Form 1, Form 2, Form 3, or Form 4.'
	if (!Number.isFinite(student.attendance) || student.attendance < 0 || student.attendance > 100) {
		return 'Attendance must be a number from 0 to 100.'
	}
	if (!Number.isFinite(student.average) || student.average < 0 || student.average > 100) {
		return 'Average must be a number from 0 to 100.'
	}
	if (!DIVISION_OPTIONS.includes(student.division)) return 'Please choose a valid division.'
	return ''
}

export function validateTeacher(teacher) {
	if (!teacher.name?.trim()) return 'Please enter the teacher name.'
	if (!GENDER_OPTIONS.includes(teacher.gender)) return 'Please choose a valid gender.'
	if (!teacher.subject?.trim()) return 'Please enter the teacher subject.'
	if (!CLASS_OPTIONS.includes(teacher.class)) return 'Please enter the correct class: Form 1, Form 2, Form 3, or Form 4.'
	if (!Number.isFinite(teacher.experience) || teacher.experience < 0) {
		return 'Experience must be a number of years, starting from 0.'
	}
	if (!teacher.qualification?.trim()) return 'Please enter the teacher qualification.'
	if (!teacher.email?.trim()) return 'Please enter the teacher email.'
	if (!EMAIL_PATTERN.test(teacher.email)) return 'Please enter a valid email address.'
	return ''
}
