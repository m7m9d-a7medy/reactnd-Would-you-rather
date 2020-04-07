import { SAVE_ANSWER_START, SAVE_ANSWER_FAILED, NEW_QUESTION_START, NEW_QUESTION_FAILED, FETCH_DATA_SUCCESSFUL, RESET_DATA } from '../actions/actionTypes'

const fetchQuestionsSuccessful = (state, action) => action.data[0]

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

// New question
const newQuestionStart = (state, action) => {
    const { question } = action
    return {
        ...state,
        [question.id]: question
    }
}

const newQuestionFailed = (state, action) => {
    const { [action.question.id]: removedQuestion, ...newState } = state
    return newState
}

// Reducer
export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_DATA_SUCCESSFUL:
            return fetchQuestionsSuccessful(state, action)

        case RESET_DATA:
            return {}

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