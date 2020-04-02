import { FETCH_QUESTIONS_SUCCESSFUL } from '../actions/actionTypes'

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_QUESTIONS_SUCCESSFUL:
            return action.questions
        
        default:
            return state
    }
}