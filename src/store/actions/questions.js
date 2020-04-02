import { FETCH_QUESTIONS_SUCCESSFUL, FETCH_QUESTIONS_FAILED } from './actionTypes'
import { _getQuestions } from '../../utils/api'

const fetchQuestionsSuccessful = questions => ({
    type: FETCH_QUESTIONS_SUCCESSFUL,
    questions,
})

const fetchQuestionsFailed = error => ({
    type: FETCH_QUESTIONS_FAILED,
    error,
})

export const fetchQuestions = () => dispatch => {
    // todo: Loading start
    _getQuestions()
        .then(questions => {
            // todo: Loading end
            dispatch(fetchQuestionsSuccessful(questions))
        })
        .catch(err => {
            // todo: Loading end
            dispatch(fetchQuestionsFailed(err))
            console.log(err)
        })
}