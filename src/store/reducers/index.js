import { combineReducers } from 'redux'
import auth from './auth'

const reducers = combineReducers({
    authedUserData: auth
})

export default reducers