import { from, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { firstValueFrom } from 'rxjs'
import { gqlClientWithStorage } from 'src/client/gqlClient'
import { _queries } from './query.graphql'
import { ToDoT } from 'src/types/todo.types'

export const getOneTask = async (id: number) => {
	type getOneTaskResponse = {
		oneTask: ToDoT
	}

	const observable$ = from(
		gqlClientWithStorage().request<getOneTaskResponse>(_queries.GetOneTask, {
			id,
		}),
	).pipe(
		map((res) => res.oneTask),
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
