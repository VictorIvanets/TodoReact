export const getTimeSpan = (dueDate: string) => {
	const dateIso = new Date(dueDate)
	const dateNow = new Date()

	const timeSpan = dateIso.getTime() - dateNow.getTime()

	let pastOrFeature: string
	let featureBool: boolean
	let past: string = ''

	if (timeSpan > 0) {
		pastOrFeature = 'Залишилось'
		featureBool = true
	} else {
		pastOrFeature = 'Закінчилось'
		featureBool = false
		past = 'тому'
	}

	const totalSeconds = Math.abs(Math.floor(timeSpan / 1000))

	const days = Math.floor(totalSeconds / 86400)
	const hours = Math.floor((totalSeconds % 86400) / 3600)
	const minutes = Math.floor((totalSeconds % 3600) / 60)

	return {
		featureBool,
		date: `${pastOrFeature}: ${days} дн. ${hours} год. ${minutes} хв. ${past}`,
	}
}

export const checkFuture = (dueDate: string): boolean => {
	const dateIso = new Date(dueDate)
	const dateNow = new Date()
	const timeSpan = dateIso.getTime() - dateNow.getTime()
	return timeSpan > 7200000 ? true : false
}
