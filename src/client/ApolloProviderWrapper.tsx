import { useMemo } from 'react'
import { ApolloProvider } from '@apollo/client'
import { useStorage } from './StorageContext'
import { createApolloClient } from './client'

export const ApolloProviderWithContext = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const { storageType } = useStorage()

	const client = useMemo(() => {
		return createApolloClient(storageType)
	}, [storageType])

	return <ApolloProvider client={client}>{children}</ApolloProvider>
}
