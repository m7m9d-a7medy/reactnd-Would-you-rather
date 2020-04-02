import { FETCH_QUESTIONS_SUCCESSFUL, FETCH_QUESTIONS_FAILED, SAVE_ANSWER_SUCCESSFUL, SAVE_ANSWER_FAILED, SAVE_ANSWER_START } from './actionTypes'
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

export const saveAnswerStart = (uid, qid, option) => ({
    type: SAVE_ANSWER_START,
    uid,
    qid,
    option,
})

export const saveAnswer = (uid, qid, option) => dispatch => {
    // Optimistic update
    dispatch(saveAnswerStart(uid, qid, option))

}