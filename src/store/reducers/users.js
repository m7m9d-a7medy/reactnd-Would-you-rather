import { FETCH_USERS_SUCCESSFUL, SAVE_ANSWER_START, SAVE_ANSWER_FAILED } from '../actions/actionTypes'

const fetchUsersSuccessfull = (state, action) => action.users

const saveAnswerStart = (state, action) => {
    const { qid, uid, answer } = action
    return {
        ...state,
        [uid]: {
            ...state[uid],
            answers: {
                ...state[uid].answers,
                [qid]: answer
            }
        }
    }
}

const saveAnswerFailed = (state, action) => {
    const { qid, uid } = action
    const newState = {
        ...state,
        [uid]: {
            ...state[uid],
            answers: {
                ...state[uid].answers
            }
        }
    }
    
    const { [qid]: removedAnswer, ...newAnswers } = newState[uid].answers
    newState[uid].answers = newAnswers

    return newState
}

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_USERS_SUCCESSFUL:
            return fetchUsersSuccessfull(state, action)

        case SAVE_ANSWER_START:
            return saveAnswerStart(state, action)

        case SAVE_ANSWER_FAILED:
            return saveAnswerFailed(state, action)

        default:
            return state
    }
}