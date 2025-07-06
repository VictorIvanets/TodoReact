import { ToDoT } from 'src/types/todo.types'
import { _queries } from 'src/api/graphql/getAllTasks.graphql'
import { useQuery } from '@tanstack/react-query'
import { taskServices } from '../service/TaskServices'

export const GET_ALL_QUERY = 'getAllTast'

export const useGetAllTask = () => {
	const { data, isError, error, isLoading, refetch } = useQuery<ToDoT[]>({
		queryKey: [GET_ALL_QUERY],
		queryFn: taskServices.getAllTast,
	})

	return {
		data,
		isError,
		error,
		isLoading,
		refetch,
	}
}
