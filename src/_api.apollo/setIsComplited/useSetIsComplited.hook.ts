import { useMutation } from '@apollo/client'
import { _queries } from './gql/query.graphql'
import { ResponeSetIsComplitedT } from './setComplited.types'

export const useSetIsComplited = (): ResponeSetIsComplitedT => {
	const [setComplite, { data, loading, error }] = useMutation(
		_queries.steIsComplited,
	)

	const setIsComplById = (id: number) => {
		setComplite({
			variables: {
				id,
			},
		})
	}

	return {
		setIsComplById,
		loadingSet: loading,
		errorSet: error,
		setIsCompleted: data && data.setIsCompleted,
	}
}
