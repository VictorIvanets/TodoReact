import { ApolloError } from '@apollo/client'
import { CategoryT } from '../../types/category.types'

export type ResponeCategoryT = {
	loadingCat: boolean
	errorCat: ApolloError | undefined
	allCategory: CategoryT[]
}
