import { combineReducers } from 'redux'
import auth from './auth'
import questions from './questions'
import users from './users'
import loading from './loading'
import error from './error'
import redirection from './redirection'

const reducers = combineReducers({
    authedUserData: auth,
    questions,
    users,
    loading,
    error,
    redirection
})

export default reducers