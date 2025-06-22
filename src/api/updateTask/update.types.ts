import { ApolloError } from '@apollo/client'
import { ToDoT } from '../../types/todo.types'
import { UpdateTaskT } from '../../types/createTask.types'

export type ResponeAddTaskT = {
	updateTaskById: (updateTask: UpdateTaskT) => void
	loadingUp: boolean
	errorUp: ApolloError | undefined
	updateTask: ToDoT
}
