import { from, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { firstValueFrom } from 'rxjs'
import { gqlClientWithStorage } from 'src/client/gqlClient'
import { _queries } from './query.graphql'
import { ToDoT } from 'src/types/todo.types'
import errorGQL from 'src/helpers/errorGQL'

export const getOneTask = async (id: number) => {
	const observable$ = from(
		gqlClientWithStorage().request<Record<'oneTask', ToDoT>>(
			_queries.GetOneTask,
			{
				id,
			},
		),
	).pipe(
		map((res) => res.oneTask),
		catchError((err) => {
			return throwError(() => new Error(errorGQL(err)))
		}),
	)

	return await firstValueFrom(observable$)
}
