import { FETCH_QUESTIONS_SUCCESSFUL, SAVE_ANSWER_START } from '../actions/actionTypes'

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_QUESTIONS_SUCCESSFUL:
            return action.questions

        case SAVE_ANSWER_START:
            const { qid, uid, option } = action
            // console.log(uid)
            // console.log(state[qid][option])
            const newState = {
                ...state,
                [qid]: {
                    ...state[qid],
                    [qid]: {
                        ...state[qid][option],
                        votes: state[qid][option].votes.concat([uid])
                    }
                }
            }

            return newState

        default:
            return state
    }
}