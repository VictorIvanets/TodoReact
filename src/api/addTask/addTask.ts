import { from, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { firstValueFrom } from 'rxjs'
import { gqlClientWithStorage } from 'src/client/gqlClient'
import { _queries } from './mutation.graphql'
import { ToDoT } from 'src/types/todo.types'
import { AddTaskT } from 'src/types/createTask.types'

export const addTask = async (addTask: AddTaskT) => {
	type AddTaskResponse = {
		addTask: ToDoT
	}

	const observable$ = from(
		gqlClientWithStorage().request<AddTaskResponse>(_queries.AddTask, {
			AddTask: addTask,
		}),
	).pipe(
		map((res) => res.addTask),
		catchError((err) => throwError(() => new Error(err.message))),
	)

	return await firstValueFrom(observable$)
}
