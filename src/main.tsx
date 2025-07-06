import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './sass/main_style.sass'
import Layout from './pages/Layout/Layout.tsx'
import { StorageProvider } from './context/StorageContext.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<StorageProvider>
				<Provider store={store}>
					<Layout />
				</Provider>
			</StorageProvider>
		</QueryClientProvider>
	</StrictMode>,
)
