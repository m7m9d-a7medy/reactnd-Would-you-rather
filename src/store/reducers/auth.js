import { AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT } from '../actions/actionTypes'

export default (state = {}, action) => {
    switch (action.type) {

        case AUTH_SUCCESS:
            return action.authedUserData

        case AUTH_FAIL: 
            return {}
        
        case AUTH_LOGOUT:
            return {}
        
        default:
            return state
    }
}
