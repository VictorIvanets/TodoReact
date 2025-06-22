import { ApolloError } from '@apollo/client'

export type ResponeDeleteTaskT = {
	deleteTaskById: (id: number) => void
	loadingDel: boolean
	errorDel: ApolloError | undefined
	deleteTask: boolean
}
