import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import graphqlLoader from 'vite-plugin-graphql-loader'
import path from 'path'

export default defineConfig({
	plugins: [react(), graphqlLoader()],
	base: '/',
	server: {
		watch: {
			usePolling: true,
		},
		host: true,
		strictPort: true,
		port: 5173,
	},
	resolve: {
		alias: {
			src: path.resolve(__dirname, 'src'),
		},
	},
})
