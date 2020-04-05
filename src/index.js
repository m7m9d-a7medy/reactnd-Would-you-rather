import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import './index.css'
import App from './components/App'
import { firebaseInit } from './utils/firebase'
import reducers from './store/reducers'
import middleware from './store/middleware'
import ErrorBoundary from './components/hoc/ErrorBoundary'

firebaseInit()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(middleware))

const app = (
    <Provider store={store}>
        <ErrorBoundary>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ErrorBoundary>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'))