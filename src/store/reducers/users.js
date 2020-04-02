import { FETCH_USERS_SUCCESSFULL } from '../actions/actionTypes'

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_USERS_SUCCESSFULL:
            return action.users
        
        default:
            return state
    }
}