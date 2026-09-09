// Grade bands derived from the seed data (A: 75-98, B: 60-74, C: 50-59, D: 40-49, F: <40).
export function gradeForScore(score) {
	if (score >= 75) return 'A'
	if (score >= 60) return 'B'
	if (score >= 50) return 'C'
	if (score >= 40) return 'D'
	return 'F'
}

// Bands chosen to stay consistent with the seed data (Division II = avg >= 65, III = 50-64.9).
export function divisionForAverage(average) {
	if (average >= 80) return 'I'
	if (average >= 65) return 'II'
	if (average >= 50) return 'III'
	if (average >= 35) return 'IV'
	return '0'
}
