import { useQuery } from '@apollo/client'
import { _queries } from './gql/query.graphql'
import { ResponeAllTaskT } from './toDo.types'

export const getAllTasks = (): ResponeAllTaskT => {
	const response = useQuery(_queries.getAllTasks)
	const { data, loading, error, refetch } = response
	return { loading, error, allTask: data && data.allTask, refetch }
}
