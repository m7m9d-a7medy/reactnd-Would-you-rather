import { combineReducers } from 'redux'
import auth from './auth'
import questions from './questions'

const reducers = combineReducers({
    authedUserData: auth,
    questions,
})

export default reducers