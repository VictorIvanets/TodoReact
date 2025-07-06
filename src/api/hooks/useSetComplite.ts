import { useMutation, useQueryClient } from '@tanstack/react-query'
import { taskServices } from '../service/TaskServices'
import { GET_ALL_QUERY } from './useGetAllTask'
import { ToDoT } from 'src/types/todo.types'

export const useSetIsComplited = () => {
	const mutation = useMutation({
		mutationFn: taskServices.setIsComplited,
		onError: (error) => {
			throw new Error(error.message)
		},
	})
	const queryClient = useQueryClient()
	const { mutate, isPending, error } = mutation

	const setIsComplited = (payload: number) => {
		console.log(payload)
		mutate(payload, {
			onSuccess(taskId) {
				console.log(taskId)

				queryClient.setQueryData<ToDoT[]>([GET_ALL_QUERY], (prev) => {
					if (!prev) return prev
					return prev.map((task) =>
						task.id === taskId
							? { ...task, isCompleted: !task.isCompleted }
							: task,
					)
				})
			},
		})
	}

	return {
		setIsComplited,
		isComplitedLoading: isPending,
		isComplitedError: error,
	}
}
