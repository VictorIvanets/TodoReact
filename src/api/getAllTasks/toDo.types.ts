import {
	ApolloError,
	ApolloQueryResult,
	OperationVariables,
} from '@apollo/client'
import { ToDoT } from '../../types/todo.types'

export type ResponeAllTaskT = {
	loading: boolean
	error: ApolloError | undefined
	allTask: ToDoT[]
	refetch: (
		variables?: Partial<OperationVariables> | undefined,
	) => Promise<ApolloQueryResult<any>>
}
