import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import { firebaseInit } from './utils/firebase'

firebaseInit()

ReactDOM.render(<App />, document.getElementById('root'))