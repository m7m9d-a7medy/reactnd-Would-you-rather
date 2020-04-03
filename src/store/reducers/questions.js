import { FETCH_QUESTIONS_SUCCESSFUL, SAVE_ANSWER_START, SAVE_ANSWER_FAILED } from '../actions/actionTypes'

const fetchQuestionsSuccessful = (state, action) => action.questions

const saveAnswerStart = (state, action) => {
    const { qid, uid, answer } = action
    return {
        ...state,
        [qid]: {
            ...state[qid],
            [answer]: {
                ...state[qid][answer],
                votes: state[qid][answer].votes.concat([uid])
            }
        }
    }
}

const saveAnswerFailed = (state, action) => {
    const { uid, qid, answer } = action
    return {
        ...state,
        [qid]: {
            ...state[qid],
            [answer]: {
                ...state[qid][answer],
                votes: state[qid][answer].votes.filter(vote => vote !== uid)
            }
        }
    }
}

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_QUESTIONS_SUCCESSFUL:
            return fetchQuestionsSuccessful(state, action)

        case SAVE_ANSWER_START:
            return saveAnswerStart(state, action)

        case SAVE_ANSWER_FAILED:
            return saveAnswerFailed(state, action)

        default:
            return state
    }
}