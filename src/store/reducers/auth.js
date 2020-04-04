import { AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT, SAVE_ANSWER_START, SAVE_ANSWER_FAILED, NEW_QUESTION_START, NEW_QUESTION_FAILED, FETCH_DATA_SUCCESSFUL } from '../actions/actionTypes'

const saveAnswerStart = (state, action) => {
    const { qid, answer } = action
    return {
        ...state,
        answers: {
            ...state.answers,
            [qid]: answer
        }
    }
}

const saveAnswerFailed = (state, action) => {
    const { qid } = action
    const newState = {
        ...state,
        answers: {
            ...state.answers
        }
    }

    const { [qid]: removedAnswer, ...newAnswers } = newState.answers
    newState.answers = newAnswers

    return newState
}

const newQuestionStart = (state, action) => {
    const { id } = action.question
    return {
        ...state,
        questions: state.questions.concat(id)
    }
}

const newQuestionFailed = (state, action) => {
    const { id } = action.question
    return {
        ...state,
        questions: state.questions.filter(qid => qid !== id)
    }
}


export default (state = null, action) => {
    switch (action.type) {
        case AUTH_SUCCESS:
            return action.authedUserData
        case FETCH_DATA_SUCCESSFUL:
            // Reupdate current user
            return action.data[1][JSON.parse(localStorage.getItem('authData')).id]

        case AUTH_FAIL:
        case AUTH_LOGOUT:
            return null

        case SAVE_ANSWER_START:
            return saveAnswerStart(state, action)

        case SAVE_ANSWER_FAILED:
            return saveAnswerFailed(state, action)

        case NEW_QUESTION_START:
            return newQuestionStart(state, action)

        case NEW_QUESTION_FAILED:
            return newQuestionFailed(state, action)

        default:
            return state
    }
}
