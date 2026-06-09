import { useState } from 'react'
import { teachers as initialTeachers } from '../data/mockData'
import initialStudents from '../data/students.json'

function nextId(items) {
	return items.reduce((max, item) => Math.max(max, item.id), 0) + 1
}

export function useSchoolData() {
	const [teachers, setTeachers] = useState(initialTeachers)
	const [students, setStudents] = useState(initialStudents)
	const [studentModalOpen, setStudentModalOpen] = useState(false)
	const [teacherModalOpen, setTeacherModalOpen] = useState(false)

	const addStudent = (student) => {
		if (!student.name) return
		setStudents((prev) => [...prev, { id: nextId(prev), ...student }])
		setStudentModalOpen(false)
	}

	const addTeacher = (teacher) => {
		if (!teacher.name) return
		setTeachers((prev) => [...prev, { id: nextId(prev), ...teacher }])
		setTeacherModalOpen(false)
	}

	return {
		teachers,
		students,
		studentModalOpen,
		teacherModalOpen,
		openAddStudent: () => setStudentModalOpen(true),
		openAddTeacher: () => setTeacherModalOpen(true),
		closeAddStudent: () => setStudentModalOpen(false),
		closeAddTeacher: () => setTeacherModalOpen(false),
		addStudent,
		addTeacher,
	}
}
