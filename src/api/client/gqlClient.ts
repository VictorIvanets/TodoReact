import { GraphQLClient } from 'graphql-request'
import { PREFIX_STATIC } from 'src/api/PREFIXS/prefix'

export const gqlClientWithStorage = () => {
	const storageType = localStorage.getItem('storageTodo') || 'sql'
	const gqlClient = new GraphQLClient(`${PREFIX_STATIC}/graphql`, {
		headers: {
			'Storage-Type': storageType,
		},
	})
	return gqlClient
}
