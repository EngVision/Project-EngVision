import { ConfigProvider } from 'antd'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'
import './index.css'
import './locales/i18n'
import { persistor, store } from './store'

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
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ConfigProvider>,
  )

ClientRenderer()
