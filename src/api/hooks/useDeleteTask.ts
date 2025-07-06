import { useMutation, useQueryClient } from '@tanstack/react-query'
import { taskServices } from '../service/TaskServices'
import { GET_ALL_QUERY } from './useGetAllTask'
import { ToDoT } from 'src/types/todo.types'

export const useDeleteTask = () => {
	const mutation = useMutation({
		mutationFn: taskServices.deleteTask,
		onError: (error) => {
			throw new Error(error.message)
		},
	})
	const queryClient = useQueryClient()
	const { mutate, isPending, error } = mutation

	const deleteTask = (payload: number) => {
		mutate(payload, {
			onSuccess(taskId) {
				queryClient.setQueryData<ToDoT[]>([GET_ALL_QUERY], (prev) => {
					if (!prev) return prev
					const res = prev.filter((task) => task.id !== +taskId)
					return [...res]
				})
			},
		})
	}

	return {
		deleteTask,
		deleteTaskLoading: isPending,
		deleteTaskError: error,
	}
}
