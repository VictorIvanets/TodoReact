import { ApolloError } from '@apollo/client'

export type ResponeSetIsComplitedT = {
	setIsComplById: (id: number) => void
	loadingSet: boolean
	errorSet: ApolloError | undefined
	setIsCompleted: boolean
}
