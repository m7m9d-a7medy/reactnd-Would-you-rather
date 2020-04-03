import { SAVE_REDIRECTION_PATH } from '../actions/actionTypes'

export default (state = '', action) => {
    switch(action.type) {
        case SAVE_REDIRECTION_PATH:
            return action.path

        default:
            return state
    }
}