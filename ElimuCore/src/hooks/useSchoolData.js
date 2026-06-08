import { teachers, students } from '../data/mockData'

export function useSchoolData() {
	// Minimal data provider used by App. Functions are no-ops for now.
	return {
		teachers,
		students,
		openAddStudent: () => {},
		openAddTeacher: () => {},
	}
}
