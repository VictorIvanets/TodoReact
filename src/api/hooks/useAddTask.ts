import { useMutation, useQueryClient } from '@tanstack/react-query'
import { taskServices } from '../service/TaskServices'
import { GET_ALL_QUERY } from './useGetAllTask'
import { ToDoT } from 'src/types/todo.types'
import { AddTaskT } from 'src/types/createTask.types'

export const useAddTask = () => {
	const mutation = useMutation({
		mutationFn: taskServices.addTask,
		onError: (error) => {
			throw new Error(error.message)
		},
	})
	const queryClient = useQueryClient()
	const { mutate, isPending, error } = mutation

	const addOneTask = (payload: AddTaskT) => {
		mutate(payload, {
			onSuccess(returntask) {
				queryClient.setQueryData<ToDoT[]>([GET_ALL_QUERY], (prev) => {
					if (!prev) return prev
					return [...prev, returntask]
				})
			},
		})
	}

	return {
		addOneTask,
		addTaskLoading: isPending,
		addTaskError: error,
	}
}
