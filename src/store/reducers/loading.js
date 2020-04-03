import * as actionTypes from '../actions/actionTypes'

export default (state = false, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
        case actionTypes.FETCH_QUESTIONS_START:
        case actionTypes.FETCH_USERS_START:
        case actionTypes.SAVE_ANSWER_START:
            return true

        case actionTypes.AUTH_SUCCESS:
        case actionTypes.FETCH_QUESTIONS_SUCCESSFUL:
        case actionTypes.FETCH_USERS_SUCCESSFUL:
        case actionTypes.SAVE_ANSWER_SUCCESSFUL:
            return false

        case actionTypes.AUTH_FAIL:
        case actionTypes.FETCH_QUESTIONS_FAILED:
        case actionTypes.FETCH_USERS_FAILED:
        case actionTypes.SAVE_ANSWER_FAILED:
            return false

        default:
            return state
    }
}