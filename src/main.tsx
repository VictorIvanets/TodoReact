import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './sass/main_style.sass'
import Layout from './pages/Layout/Layout.tsx'
import { ApolloProviderWithContext } from './client/ApolloProviderWrapper.tsx'
import { StorageProvider } from './client/StorageContext.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<StorageProvider>
			<ApolloProviderWithContext>
				<Layout />
			</ApolloProviderWithContext>
		</StorageProvider>
	</StrictMode>,
)
