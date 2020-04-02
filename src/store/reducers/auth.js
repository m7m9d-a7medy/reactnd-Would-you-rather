import { AUTH_SUCCESS, AUTH_FAIL } from '../actions/actionTypes'

export default (state = {}, action) => {
    switch (action.type) {

        case AUTH_SUCCESS:
            return action.authedUserData

        case AUTH_FAIL: 
            return action.authError
        
        default:
            return state
    }
}
