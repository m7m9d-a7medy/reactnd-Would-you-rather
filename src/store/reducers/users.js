import { FETCH_USERS_SUCCESSFUL } from '../actions/actionTypes'

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_USERS_SUCCESSFUL:
            return action.users
        
        default:
            return state
    }
}