import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { store } from './store'
import VendorApp from './VendorApp.jsx'
import './i18n'
import './styles/tailwind.css'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <VendorApp />
      </Router>
    </Provider>
  </React.StrictMode>,
)
