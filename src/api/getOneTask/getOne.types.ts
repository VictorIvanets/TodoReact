import { ApolloError } from '@apollo/client'
import { ToDoT } from '../../types/todo.types'

export type ResponeOneTaskT = {
	fetchOneTask: (id: number) => void
	loadingOne: boolean
	errorOne: ApolloError | undefined
	oneTask: ToDoT
}
