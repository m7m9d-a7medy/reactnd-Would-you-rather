import { FETCH_USERS_SUCCESSFUL, SAVE_ANSWER_START } from '../actions/actionTypes'

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_USERS_SUCCESSFUL:
            return action.users

        case SAVE_ANSWER_START:
            const { qid, uid, option } = action
            return {
                ...state,
                [uid]: {
                    ...state[uid],
                    answers: {
                        ...state[uid].answers,
                        [qid]: option
                    }
                }
            }

        default:
            return state
    }
}