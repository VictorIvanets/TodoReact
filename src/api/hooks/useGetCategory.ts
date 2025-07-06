import { _queries } from 'src/api/graphql/getAllTasks.graphql'
import { useQuery } from '@tanstack/react-query'
import { taskServices } from '../service/TaskServices'
import { CategoryT } from 'src/types/category.types'

export const GET_ALL_CATEGORY = 'getAllCategory'

export const useGetCategory = () => {
	const { data, isError, error, isLoading, refetch } = useQuery<CategoryT[]>({
		queryKey: [GET_ALL_CATEGORY],
		queryFn: taskServices.getCategory,
	})

	return {
		category: data,
		isError,
		categoryError: error,
		categoryLoading: isLoading,
		refetch,
	}
}
