import { _queries } from './gql/query.graphql'
import { ResponeOneTaskT } from './getOne.types'
import { useLazyQuery } from '@apollo/client'

export const useGetOneTask = (): ResponeOneTaskT => {
	const [getOneTask, { data, loading, error }] = useLazyQuery(
		_queries.getOneTask,
	)
	const fetchOneTask = (id: number) => {
		getOneTask({ variables: { id } })
	}
	return {
		fetchOneTask,
		oneTask: data?.oneTask,
		loadingOne: loading,
		errorOne: error,
	}
}
