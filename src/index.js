import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import './index.css'
import App from './components/App'
import { firebaseInit } from './utils/firebase'
import reducers from './store/reducers'
import middleware from './store/middleware'

firebaseInit()

const store = createStore(reducers, middleware)
const app = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'))