import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { PREFIX_STATIC } from '../PREFIXS/prefix'

export const createApolloClient = (storageType: 'sql' | 'xml') => {
	const httpLink = new HttpLink({
		uri: `${PREFIX_STATIC}/graphql`,
	})

	const authLink = setContext((_, { headers }) => ({
		headers: {
			...headers,
			'Storage-Type': storageType,
		},
	}))

	return new ApolloClient({
		link: authLink.concat(httpLink),
		cache: new InMemoryCache(),
	})
}
