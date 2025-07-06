import { _queries } from 'src/api/graphql/getAllTasks.graphql'
import { useMutation } from '@tanstack/react-query'
import { taskServices } from '../service/TaskServices'

export const useGetOneTask = () => {
	const mutation = useMutation({
		mutationFn: taskServices.getOneTask,
		onError: (error) => {
			throw new Error(error.message)
		},
	})
	const { data, mutate, isPending, error } = mutation

	const getOneTask = (payload: number) => {
		mutate(payload)
	}

	return {
		oneTask: data,
		getOneTask,
		getOneTaskLoading: isPending,
		getOneTaskError: error,
	}
}
