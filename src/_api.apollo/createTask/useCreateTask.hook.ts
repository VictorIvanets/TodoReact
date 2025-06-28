import { useMutation } from '@apollo/client'
import { _queries } from './gql/query.graphql'
import { ResponeAddTaskT } from './create.types'
import { AddTaskT } from '../../types/createTask.types'

export const useAddNewTask = (): ResponeAddTaskT => {
	const [addTaskFn, { data, loading, error }] = useMutation(_queries.AddTask)
	const addNewTask = (addTask: AddTaskT) => {
		addTaskFn({
			variables: {
				AddTask: addTask,
			},
		})
	}

	return {
		addNewTask,
		loadingAdd: loading,
		errorAdd: error,
		addTask: data && data.addTask,
	}
}
