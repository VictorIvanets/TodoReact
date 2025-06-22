import { ApolloError } from '@apollo/client'
import { AddTaskT } from '../../types/createTask.types'
import { ToDoT } from '../../types/todo.types'

export type ResponeAddTaskT = {
	addNewTask: (addTask: AddTaskT) => void
	loadingAdd: boolean
	errorAdd: ApolloError | undefined
	addTask: ToDoT
}
