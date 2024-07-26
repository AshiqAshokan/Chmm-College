import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import store from './Store';
import { Provider } from 'react-redux'
import { SocketProvider } from './SocketContext.jsx';
import './index.css'
import '../src/autofill.css'
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    <SocketProvider>
      <App />
    </SocketProvider>
  </React.StrictMode>
  </Provider>
)
