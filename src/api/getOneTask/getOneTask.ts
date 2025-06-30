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
		catchError((err) => throwError(() => new Error(err.message))),
	)

	return await firstValueFrom(observable$)
}
