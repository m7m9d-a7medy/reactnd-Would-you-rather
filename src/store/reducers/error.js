import * as actionTypes from '../actions/actionTypes'

export default (state = null, action) => {
    switch (action.type) {
        case actionTypes.AUTH_SUCCESS:
        case actionTypes.FETCH_DATA_SUCCESSFUL:
        case actionTypes.SAVE_ANSWER_SUCCESSFUL:
        case actionTypes.NEW_QUESTION_SUCCESSFUL:
            return null

        case actionTypes.AUTH_FAIL:
            // This is due to the way authApi handles rejects, check catch blocks for more details
            const errorType = Object.keys(action.error)[0]
            const errorMessage = Object.values(action.error)[0].message
            return {
                message:  `${errorType}: ${errorMessage}`
            }

        case actionTypes.FETCH_DATA_FAILED:
        case actionTypes.SAVE_ANSWER_FAILED:
        case actionTypes.NEW_QUESTION_FAILED:
            return action.error

        case actionTypes.CLEAR_ERROR:
            return null

        default:
            return state
    }
}