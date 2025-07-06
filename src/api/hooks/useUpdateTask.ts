import { useMutation, useQueryClient } from '@tanstack/react-query'
import { taskServices } from '../service/TaskServices'
import { GET_ALL_QUERY } from './useGetAllTask'
import { ToDoT } from 'src/types/todo.types'
import { UpdateTaskT } from 'src/types/createTask.types'

export const useUpdateTask = () => {
	const mutation = useMutation({
		mutationFn: taskServices.updateTask,
		onError: (error) => {
			throw new Error(error.message)
		},
	})
	const queryClient = useQueryClient()
	const { mutate, isPending, error } = mutation

	const updateOneTask = (payload: UpdateTaskT) => {
		mutate(payload, {
			onSuccess(returntask) {
				queryClient.setQueryData<ToDoT[]>([GET_ALL_QUERY], (prev) => {
					if (!prev) return prev
					return prev.map((task) =>
						task.id === returntask.id ? { ...returntask } : task,
					)
				})
			},
		})
	}

	return {
		updateOneTask,
		updateTaskLoading: isPending,
		updateTaskError: error,
	}
}
