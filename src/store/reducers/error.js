import * as actionTypes from '../actions/actionTypes'

export default (state = null, action) => {
    switch (action.type) {
        case actionTypes.AUTH_SUCCESS:
        case actionTypes.FETCH_QUESTIONS_SUCCESSFUL:
        case actionTypes.FETCH_USERS_SUCCESSFUL:
        case actionTypes.SAVE_ANSWER_SUCCESSFUL:
        case actionTypes.NEW_QUESTION_SUCCESSFUL:
            return null

        case actionTypes.AUTH_FAIL:
        case actionTypes.FETCH_QUESTIONS_FAILED:
        case actionTypes.FETCH_USERS_FAILED:
        case actionTypes.SAVE_ANSWER_FAILED:
        case actionTypes.NEW_QUESTION_FAILED:
            return action.error

        default:
            return state
    }
}