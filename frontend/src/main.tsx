import { ConfigProvider } from 'antd'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'
import './index.css'
import './locales/i18n'
import { persistor, store } from './store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactGA from 'react-ga4'

const queryClient = new QueryClient()

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

const ClientRenderer = () =>
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <ConfigProvider
      theme={{
        token: {
          colorText: '#313134',
          fontFamily: 'Poppins, sans-serif',
          fontSize: 14,
        },
      }}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ConfigProvider>,
  )

ClientRenderer()
