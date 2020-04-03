import { SAVE_ANSWER_SUCCESSFUL, SAVE_ANSWER_FAILED, SAVE_ANSWER_START, NEW_QUESTION_START, NEW_QUESTION_SUCCESSFUL } from './actionTypes'
import { _saveQuestionAnswer, _saveQuestion } from '../../utils/api'
import { formatQuestion } from '../../utils/helpers'


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
    _saveQuestionAnswer({ authedUser: uid, qid, answer })
        .then(() => {
            dispatch(saveAnswerSuccessful())
        })
        .catch(err => {
            console.log(err)
            dispatch(saveAnswerFailed(err, qid, uid))
        })
}

// New question
export const newQuestionStart = (question) => ({
    type: NEW_QUESTION_START,
    question,
})

export const newQuestionSuccessful = () => ({
    type: NEW_QUESTION_SUCCESSFUL
})

export const newQuestionFailed = (error, question) => ({
    type: newQuestionFailed,
    error,
    question,
})

export const newQuestion = ({ optionOneText, optionTwoText, author }) => dispatch => {
    const formattedQuestion = formatQuestion({ optionOneText, optionTwoText, author })

    // Optimistic update
    dispatch(newQuestionStart(formattedQuestion))

    _saveQuestion(formattedQuestion, author)
        .then(res => {
            dispatch(newQuestionSuccessful())
        })
        .catch(err => {
            console.log(err)
            dispatch(newQuestionFailed(err, formattedQuestion))
        })
}