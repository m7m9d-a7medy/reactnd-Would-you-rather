import * as actionTypes from '../actions/actionTypes'

export default (state = false, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
        case actionTypes.FETCH_DATA_START:
        case actionTypes.SAVE_ANSWER_START:
        case actionTypes.NEW_QUESTION_START:
            return true

        case actionTypes.AUTH_SUCCESS:
        case actionTypes.FETCH_DATA_SUCCESSFUL:
        case actionTypes.SAVE_ANSWER_SUCCESSFUL:
        case actionTypes.NEW_QUESTION_SUCCESSFUL:
            return false

        case actionTypes.AUTH_FAIL:
        case actionTypes.FETCH_DATA_FAILED:
        case actionTypes.SAVE_ANSWER_FAILED:
        case actionTypes.NEW_QUESTION_FAILED:
            return false

        default:
            return state
    }
}