export const STATUS_SCORE = {
	present: 100,
	late: 75,
	absent: 0,
}

export const STATUS_LABEL = {
	present: 'Present',
	late: 'Late',
	absent: 'Absent',
}

// A new mark contributes 1/20 to the rolling attendance percentage.
export function nextAttendanceValue(student, status) {
	const current = Number.isFinite(student.attendance) ? student.attendance : STATUS_SCORE[status]
	return Math.max(0, Math.min(100, Number((((current * 19) + STATUS_SCORE[status]) / 20).toFixed(1))))
}

// Local (not UTC) YYYY-MM-DD, safe for use as a register key and <input type="date"> value.
export function getTodayISO() {
	const now = new Date()
	const year = now.getFullYear()
	const month = String(now.getMonth() + 1).padStart(2, '0')
	const day = String(now.getDate()).padStart(2, '0')
	return `${year}-${month}-${day}`
}

export function formatDate(iso) {
	return new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	})
}
