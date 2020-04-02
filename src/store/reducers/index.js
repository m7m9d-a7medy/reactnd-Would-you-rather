import { combineReducers } from 'redux'
import auth from './auth'
import questions from './questions'
import users from './users'

const reducers = combineReducers({
    authedUserData: auth,
    questions,
    users,
})

export default reducers