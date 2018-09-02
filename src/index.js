import React from 'react'
import ReactDOM from 'react-dom'
import './CSS/index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import history from './history'
import { Router } from 'react-router-dom'
import { AuthProvider } from 'fireview'
import firebase from 'firebase'

ReactDOM.render(
  <AuthProvider auth={firebase.auth()}>
    <Router history={history}>
      <App />
    </Router>
  </AuthProvider>,
  document.getElementById('root')
)
registerServiceWorker()
