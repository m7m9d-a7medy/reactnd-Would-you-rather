import { FETCH_QUESTIONS_SUCCESSFUL, FETCH_QUESTIONS_FAILED, SAVE_ANSWER_SUCCESSFUL, SAVE_ANSWER_FAILED, SAVE_ANSWER_START } from './actionTypes'
import { _getQuestions, _saveQuestionAnswer } from '../../utils/api'

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

export const saveAnswerStart = (uid, qid, answer) => ({
    type: SAVE_ANSWER_START,
    uid,
    qid,
    answer,
})

export const saveAnswerSuccessful = () => ({
    type: SAVE_ANSWER_SUCCESSFUL
})

export const saveAnswerFailed = (error, qid, uid) => ({
    type: SAVE_ANSWER_FAILED,
    error,
    qid,
    uid,
})

export const saveAnswer = (uid, qid, answer) => dispatch => {
    // Optimistic update
    dispatch(saveAnswerStart(uid, qid, answer))
    _saveQuestionAnswer({ authedUser: uid, qid, answer})
        .then(() => {
            dispatch(saveAnswerSuccessful())
        })
        .catch(err => {
            console.log(err)
            dispatch(saveAnswerFailed(err, qid, uid))
        })
}