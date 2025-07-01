import { from, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { firstValueFrom } from 'rxjs'
import { gqlClientWithStorage } from 'src/client/gqlClient'
import { _queries } from './query.graphql'
import { ToDoT } from 'src/types/todo.types'

export const getAllTasks = async () => {
	type AllTasksResponse = {
		allTask: ToDoT[]
	}
	const observable$ = from(
		gqlClientWithStorage().request<AllTasksResponse>(_queries.getAllTasks),
	).pipe(
		map((res) => res.allTask),
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
