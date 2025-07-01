import { from, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { firstValueFrom } from 'rxjs'
import { gqlClientWithStorage } from 'src/client/gqlClient'
import { _queries } from './mutation.graphql'

export const deleteTask = async (id: number) => {
	type deleteTaskResponse = {
		deleteTask: number
	}

	const observable$ = from(
		gqlClientWithStorage().request<deleteTaskResponse>(_queries.DeleteTask, {
			id,
		}),
	).pipe(
		map((res) => res.deleteTask),
		catchError((err) => {
			let message = 'Unknown error'

			if (err?.response?.errors?.[0]?.message) {
				message = err.response.errors[0].message
			} else if (err?.message) {
				message = err.message
			}

			return throwError(() => new Error(message))
		}),
	)

	return await firstValueFrom(observable$)
}
