import { useEffect, useRef, useState } from 'react'
import initialStudents from '../data/students.json'
import initialTeachers from '../data/teachers.json'
import { nextAttendanceValue } from '../utils/attendance'
import { divisionForAverage, gradeForScore } from '../utils/grades'
import { validateStudent, validateTeacher } from '../utils/schoolValidation'

const STUDENTS_STORAGE_KEY = 'elimucore.students'
const TEACHERS_STORAGE_KEY = 'elimucore.teachers'
const ATTENDANCE_STORAGE_KEY = 'elimucore.attendance'

function nextId(items) {
	return items.reduce((max, item) => Math.max(max, item.id), 0) + 1
}

function loadStored(key, fallback, isValid) {
	if (typeof window === 'undefined') return fallback

	try {
		const stored = window.localStorage.getItem(key)
		if (!stored) return fallback
		const parsed = JSON.parse(stored)
		return isValid(parsed) ? parsed : fallback
	} catch {
		return fallback
	}
}

function saveStored(key, value) {
	if (typeof window === 'undefined') return

	try {
		window.localStorage.setItem(key, JSON.stringify(value))
	} catch {
		// Keep in-memory edits working if browser storage is unavailable.
	}
}

function insertAt(list, item, index) {
	if (list.some((existing) => existing.id === item.id)) return list
	const next = [...list]
	next.splice(Math.min(index, next.length), 0, item)
	return next
}

function summarizeSubjects(subjects) {
	const results = Object.values(subjects)
	if (!results.length) return { average: null, division: '' }

	const average = Number((results.reduce((sum, result) => sum + result.score, 0) / results.length).toFixed(1))
	return { average, division: divisionForAverage(average) }
}

export function useSchoolData() {
	const [teachers, setTeachers] = useState(() => loadStored(TEACHERS_STORAGE_KEY, initialTeachers, Array.isArray))
	const [students, setStudents] = useState(() => loadStored(STUDENTS_STORAGE_KEY, initialStudents, Array.isArray))
	const [attendanceRegisters, setAttendanceRegisters] = useState(() => loadStored(
		ATTENDANCE_STORAGE_KEY,
		{},
		(value) => Boolean(value) && typeof value === 'object' && !Array.isArray(value),
	))
	const [studentModalOpen, setStudentModalOpen] = useState(false)
	const [teacherModalOpen, setTeacherModalOpen] = useState(false)
	const [editingStudent, setEditingStudent] = useState(null)
	const [editingTeacher, setEditingTeacher] = useState(null)
	const [toasts, setToasts] = useState([])
	const toastIdRef = useRef(0)

	useEffect(() => {
		saveStored(STUDENTS_STORAGE_KEY, students)
	}, [students])

	useEffect(() => {
		saveStored(TEACHERS_STORAGE_KEY, teachers)
	}, [teachers])

	useEffect(() => {
		saveStored(ATTENDANCE_STORAGE_KEY, attendanceRegisters)
	}, [attendanceRegisters])

	const dismissToast = (id) => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id))
	}

	const pushToast = ({ message, actionLabel = '', onAction = null, duration = 6000 }) => {
		const id = ++toastIdRef.current
		setToasts((prev) => [...prev, { id, message, actionLabel, onAction }])
		window.setTimeout(() => dismissToast(id), duration)
	}

	const saveStudent = (student) => {
		const error = validateStudent(student)
		if (error) return { ok: false, error }

		const duplicate = students.some(
			(item) => item.id !== editingStudent?.id
				&& item.name.trim().toLowerCase() === student.name.toLowerCase(),
		)
		if (duplicate) return { ok: false, error: 'A student with this name already exists.' }

		setStudents((prev) => (
			editingStudent
				? prev.map((item) => (item.id === editingStudent.id ? { ...item, ...student, id: editingStudent.id } : item))
				: [...prev, { id: nextId(prev), ...student }]
		))
		setEditingStudent(null)
		setStudentModalOpen(false)
		pushToast({ message: editingStudent ? `Updated ${student.name}` : `Added ${student.name}` })
		return { ok: true }
	}

	const saveTeacher = (teacher) => {
		const error = validateTeacher(teacher)
		if (error) return { ok: false, error }

		const duplicate = teachers.some(
			(item) => item.id !== editingTeacher?.id
				&& item.email.trim().toLowerCase() === teacher.email.toLowerCase(),
		)
		if (duplicate) return { ok: false, error: 'A teacher with this email already exists.' }

		setTeachers((prev) => (
			editingTeacher
				? prev.map((item) => (item.id === editingTeacher.id ? { ...item, ...teacher, id: editingTeacher.id } : item))
				: [...prev, { id: nextId(prev), ...teacher }]
		))
		setEditingTeacher(null)
		setTeacherModalOpen(false)
		pushToast({ message: editingTeacher ? `Updated ${teacher.name}` : `Added ${teacher.name}` })
		return { ok: true }
	}

	// Saves a dated register (marks: { studentId: 'present' | 'late' | 'absent' }) and
	// folds each mark into the student's rolling attendance percentage.
	const saveAttendance = (date, marks) => {
		const entries = Object.entries(marks)
		if (!entries.length) return

		setAttendanceRegisters((prev) => ({
			...prev,
			[date]: { ...(prev[date] || {}), ...marks },
		}))
		setStudents((prev) => prev.map((student) => (
			Object.prototype.hasOwnProperty.call(marks, student.id)
				? { ...student, attendance: nextAttendanceValue(student, marks[student.id]) }
				: student
		)))
		pushToast({ message: `Saved attendance for ${entries.length} ${entries.length === 1 ? 'student' : 'students'}` })
	}

	// Replaces a student's subject scores, recomputing letter grades, average and division.
	const saveStudentGrades = (studentId, scores) => {
		const student = students.find((item) => item.id === studentId)
		if (!student) return { ok: false, error: 'Student not found.' }

		const subjects = {}
		for (const [subject, score] of Object.entries(scores)) {
			if (!Number.isFinite(score) || score < 0 || score > 100) {
				return { ok: false, error: `Score for ${subject} must be between 0 and 100.` }
			}
			subjects[subject] = { score, grade: gradeForScore(score) }
		}

		const { average, division } = summarizeSubjects(subjects)
		setStudents((prev) => prev.map((item) => (
			item.id === studentId ? { ...item, subjects, average, division } : item
		)))
		pushToast({ message: `Updated grades for ${student.name}` })
		return { ok: true }
	}

	const deleteStudent = (id) => {
		const index = students.findIndex((student) => student.id === id)
		if (index === -1) return
		const deleted = students[index]

		setStudents((prev) => prev.filter((student) => student.id !== id))
		pushToast({
			message: `Deleted ${deleted.name}`,
			actionLabel: 'Undo',
			onAction: () => setStudents((prev) => insertAt(prev, deleted, index)),
		})
	}

	const deleteTeacher = (id) => {
		const index = teachers.findIndex((teacher) => teacher.id === id)
		if (index === -1) return
		const deleted = teachers[index]

		setTeachers((prev) => prev.filter((teacher) => teacher.id !== id))
		pushToast({
			message: `Deleted ${deleted.name}`,
			actionLabel: 'Undo',
			onAction: () => setTeachers((prev) => insertAt(prev, deleted, index)),
		})
	}

	const closeAddStudent = () => {
		setEditingStudent(null)
		setStudentModalOpen(false)
	}

	const closeAddTeacher = () => {
		setEditingTeacher(null)
		setTeacherModalOpen(false)
	}

	// Restores the bundled seed data and clears all saved attendance registers.
	const resetData = () => {
		if (typeof window !== 'undefined') {
			try {
				window.localStorage.removeItem(STUDENTS_STORAGE_KEY)
				window.localStorage.removeItem(TEACHERS_STORAGE_KEY)
				window.localStorage.removeItem(ATTENDANCE_STORAGE_KEY)
			} catch {
				// Storage unavailable — state reset below still applies for the session.
			}
		}
		setStudents(initialStudents)
		setTeachers(initialTeachers)
		setAttendanceRegisters({})
		pushToast({ message: 'Data reset to the original records' })
	}

	return {
		teachers,
		students,
		attendanceRegisters,
		studentModalOpen,
		teacherModalOpen,
		editingStudent,
		editingTeacher,
		toasts,
		openAddStudent: () => {
			setEditingStudent(null)
			setStudentModalOpen(true)
		},
		openAddTeacher: () => {
			setEditingTeacher(null)
			setTeacherModalOpen(true)
		},
		openEditStudent: (student) => {
			setEditingStudent(student)
			setStudentModalOpen(true)
		},
		openEditTeacher: (teacher) => {
			setEditingTeacher(teacher)
			setTeacherModalOpen(true)
		},
		closeAddStudent,
		closeAddTeacher,
		dismissToast,
		saveStudent,
		saveTeacher,
		saveAttendance,
		saveStudentGrades,
		deleteStudent,
		deleteTeacher,
		resetData,
	}
}
