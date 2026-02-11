import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ThemeProvider } from './theme/ThemeContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { store } from './store/redux/store'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 0,
			refetchOnWindowFocus: false,
		},
		mutations: {
			retry: 0,
		},
	},
})

console.log('Starting application...')
const container = document.getElementById('root')!
const root = createRoot(container)
root.render(
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ThemeProvider>
		</QueryClientProvider>
)
console.log('Application started successfully.')
