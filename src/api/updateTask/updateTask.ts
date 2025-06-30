import { from, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { firstValueFrom } from 'rxjs'
import { gqlClientWithStorage } from 'src/client/gqlClient'
import { _queries } from './mutation.graphql'
import { ToDoT } from 'src/types/todo.types'
import { UpdateTaskT } from 'src/types/createTask.types'

export const updateTask = async (updateTask: UpdateTaskT) => {
	type UpDateTaskResponse = {
		updateTask: ToDoT
	}
	console.log(_queries)
	const observable$ = from(
		gqlClientWithStorage().request<UpDateTaskResponse>(_queries.UpDate, {
			UpdateTask: updateTask,
		}),
	).pipe(
		map((res) => res.updateTask),
		catchError((err) => throwError(() => new Error(err.message))),
	)

	return await firstValueFrom(observable$)
}
