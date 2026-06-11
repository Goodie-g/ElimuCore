import { useState } from 'react'
import initialStudents from '../data/students.json'
import initialTeachers from '../data/teachers.json'
import { validateStudent, validateTeacher } from '../utils/schoolValidation'

const STUDENTS_STORAGE_KEY = 'elimucore.students'
const TEACHERS_STORAGE_KEY = 'elimucore.teachers'

function nextId(items) {
	return items.reduce((max, item) => Math.max(max, item.id), 0) + 1
}

function loadStoredList(key, fallback) {
	if (typeof window === 'undefined') return fallback

	try {
		const stored = window.localStorage.getItem(key)
		if (!stored) return fallback
		const parsed = JSON.parse(stored)
		return Array.isArray(parsed) ? parsed : fallback
	} catch {
		return fallback
	}
}

function saveStoredList(key, items) {
	if (typeof window === 'undefined') return

	try {
		window.localStorage.setItem(key, JSON.stringify(items))
	} catch {
		// Keep in-memory edits working if browser storage is unavailable.
	}
}

function canDelete(message) {
	return window.confirm(message)
}

export function useSchoolData() {
	const [teachers, setTeachers] = useState(() => loadStoredList(TEACHERS_STORAGE_KEY, initialTeachers))
	const [students, setStudents] = useState(() => loadStoredList(STUDENTS_STORAGE_KEY, initialStudents))
	const [studentModalOpen, setStudentModalOpen] = useState(false)
	const [teacherModalOpen, setTeacherModalOpen] = useState(false)
	const [editingStudent, setEditingStudent] = useState(null)
	const [editingTeacher, setEditingTeacher] = useState(null)

	const saveStudent = (student) => {
		const error = validateStudent(student)
		if (error) return { ok: false, error }

		setStudents((prev) => {
			const nextStudents = editingStudent
				? prev.map((item) => (item.id === editingStudent.id ? { ...item, ...student, id: editingStudent.id } : item))
				: [...prev, { id: nextId(prev), ...student }]

			saveStoredList(STUDENTS_STORAGE_KEY, nextStudents)
			return nextStudents
		})
		setEditingStudent(null)
		setStudentModalOpen(false)
		return { ok: true }
	}

	const saveTeacher = (teacher) => {
		const error = validateTeacher(teacher)
		if (error) return { ok: false, error }

		setTeachers((prev) => {
			const nextTeachers = editingTeacher
				? prev.map((item) => (item.id === editingTeacher.id ? { ...item, ...teacher, id: editingTeacher.id } : item))
				: [...prev, { id: nextId(prev), ...teacher }]

			saveStoredList(TEACHERS_STORAGE_KEY, nextTeachers)
			return nextTeachers
		})
		setEditingTeacher(null)
		setTeacherModalOpen(false)
		return { ok: true }
	}

	const updateStudentAttendance = (attendanceUpdates) => {
		setStudents((prev) => {
			const nextStudents = prev.map((student) => {
				if (!Object.prototype.hasOwnProperty.call(attendanceUpdates, student.id)) return student

				return {
					...student,
					attendance: attendanceUpdates[student.id],
				}
			})

			saveStoredList(STUDENTS_STORAGE_KEY, nextStudents)
			return nextStudents
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

	return {
		teachers,
		students,
		studentModalOpen,
		teacherModalOpen,
		editingStudent,
		editingTeacher,
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
		saveStudent,
		saveTeacher,
		updateStudentAttendance,
		deleteStudent: (id) => {
			if (!canDelete('Delete this student?')) return
			setStudents((prev) => {
				const nextStudents = prev.filter((student) => student.id !== id)
				saveStoredList(STUDENTS_STORAGE_KEY, nextStudents)
				return nextStudents
			})
		},
		deleteTeacher: (id) => {
			if (!canDelete('Delete this teacher?')) return
			setTeachers((prev) => {
				const nextTeachers = prev.filter((teacher) => teacher.id !== id)
				saveStoredList(TEACHERS_STORAGE_KEY, nextTeachers)
				return nextTeachers
			})
		},
	}
}
