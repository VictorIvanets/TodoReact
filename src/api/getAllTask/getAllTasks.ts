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
			return throwError(() => new Error(err.message))
		}),
	)
	return await firstValueFrom(observable$)
}
