import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './sass/main_style.sass'
import Layout from './pages/Layout/Layout.tsx'
import { StorageProvider } from './context/StorageContext.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<StorageProvider>
			<Provider store={store}>
				<Layout />
			</Provider>
		</StorageProvider>
	</StrictMode>,
)
