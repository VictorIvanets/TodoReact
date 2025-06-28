import { useMutation } from '@apollo/client'
import { _queries } from './gql/query.graphql'
import { ResponeDeleteTaskT } from './delete.types'

export const useDeleteTask = (): ResponeDeleteTaskT => {
	const [deleteTask, { data, loading, error }] = useMutation(
		_queries.deleteTask,
	)

	const deleteTaskById = (id: number) => {
		deleteTask({
			variables: {
				id,
			},
		})
	}

	return {
		deleteTaskById,
		loadingDel: loading,
		errorDel: error,
		deleteTask: data && data.deleteTask,
	}
}
