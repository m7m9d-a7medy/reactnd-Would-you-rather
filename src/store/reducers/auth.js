import { AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT } from '../actions/actionTypes'

export default (state = null, action) => {
    switch (action.type) {

        case AUTH_SUCCESS:
            return action.authedUserData

        case AUTH_FAIL: 
        case AUTH_LOGOUT:
            return null
        
        default:
            return state
    }
}
