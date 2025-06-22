import { useQuery } from '@apollo/client'
import { _queries } from './gql/query.graphql'
import { ResponeCategoryT } from './category.types'

export const getAllCategory = (): ResponeCategoryT => {
	const response = useQuery(_queries.getAllCategory)
	const { data, loading, error } = response
	return {
		loadingCat: loading,
		errorCat: error,
		allCategory: data && data.allCategory,
	}
}
