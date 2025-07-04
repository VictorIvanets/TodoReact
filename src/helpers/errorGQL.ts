export default function errorGQL(err: any) {
	let message = 'Unknown error'

	if (err?.response?.errors?.[0]?.message) {
		message = err.response.errors[0].message
	} else if (err?.message) {
		message = err.message
	}
	return message
}
