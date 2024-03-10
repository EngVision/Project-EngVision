import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'
import ErrorBoundary from './ErrorBoundary'
import './index.css'
import './locales/i18n'
import { persistor, store } from './store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactGA from 'react-ga4'
import * as Sentry from '@sentry/react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN

Sentry.init({
  dsn: SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
    }),
    new Sentry.Replay(),
  ],
  tracesSampleRate: 0.5,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
})

const TRACKING_ID = import.meta.env.VITE_GA4_TRACKING_ID

TRACKING_ID &&
  ReactGA.initialize(TRACKING_ID, {
    gtagOptions: {
      send_page_view: false,
    },
  })

TRACKING_ID &&
  ReactGA.send({
    hitType: 'pageview',
    page: window.location.pathname,
    title: window.location.pathname,
  })

// Hide the tracking ID just showing the first two and last three characters
const regex = /(.{2})(.*)(.{3})/

TRACKING_ID
  ? console.log(
      'GA4 tracking ID successfully loaded:',
      TRACKING_ID.replace(
        regex,
        (x: string, y: string, z: string, w: string) =>
          y + z.replace(/./g, '*') + w,
      ),
    )
  : console.error('No GA4 tracking ID found')

console.log('ENV', {
  VITE_BASE_URL: import.meta.env.VITE_BASE_URL,
  VITE_SERVER_FILES_URL: import.meta.env.VITE_SERVER_FILES_URL,
  VITE_GA4_TRACKING_ID: import.meta.env.VITE_GA4_TRACKING_ID,
  VITE_SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
  VITE_SERVER_CHAT_URL: import.meta.env.VITE_SERVER_CHAT_URL,
  VITE_WS_URL: import.meta.env.VITE_WS_URL,
  VITE_WHISPER_URL: import.meta.env.VITE_WHISPER_URL,
})

const ClientRenderer = () =>
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ErrorBoundary>,
  )

ClientRenderer()
