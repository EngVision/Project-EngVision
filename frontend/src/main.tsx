import { ConfigProvider } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider as ReduxStoreProvider } from 'react-redux'
import { HistoryRouter } from 'redux-first-history/rr6'

import App from './App'
import { history, store } from './store'
import './locales/i18n'

const ClientRenderer = () =>
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <ConfigProvider
      theme={{
        token: {
          colorText: '#313134',
          fontFamily: 'Poppins, sans-serif',
        },
      }}
    >
      <ReduxStoreProvider store={store}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </ReduxStoreProvider>
    </ConfigProvider>,
  )

if (process.env.NODE_ENV === 'development') {
  // Prepare MSW in a Service Worker
  import('../mocks/browser')
    .then(({ worker }) => {
      worker.start()
    })
    // Launched mock server, and then start client React app
    .then(() => {
      ClientRenderer()
    })
} else {
  ClientRenderer()
}
