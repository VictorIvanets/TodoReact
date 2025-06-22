import { useMutation } from '@apollo/client'
import { _queries } from './gql/query.graphql'
import { ResponeAddTaskT } from './update.types'
import { UpdateTaskT } from '../../types/createTask.types'

export const useUpdateTask = (): ResponeAddTaskT => {
	const [updateTaskFn, { data, loading, error }] = useMutation(_queries.UpDate)
	const updateTaskById = (updateTask: UpdateTaskT) => {
		updateTaskFn({
			variables: {
				UpdateTask: updateTask,
			},
		})
	}

	return {
		updateTaskById,
		loadingUp: loading,
		errorUp: error,
		updateTask: data && data.updateTask,
	}
}
