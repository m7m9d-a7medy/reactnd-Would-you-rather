import { FETCH_QUESTIONS_SUCCESSFUL, FETCH_USERS_SUCCESSFULL, FETCH_QUESTIONS_FAILED, FETCH_USERS_FAILED } from './actionTypes'
import { _getQuestions, _getUsers } from '../../utils/api'

const fetchQuestionsSuccessful = questions => ({
    type: FETCH_QUESTIONS_SUCCESSFUL,
    questions,
})

const fetchUsersSuccessful = users => ({
    type: FETCH_USERS_SUCCESSFULL,
    users,
})

const fetchQuestionsFailed = error => ({
    type: FETCH_QUESTIONS_FAILED,
    error,
})

const fetchUsersFailed = error => ({
    type: FETCH_USERS_FAILED,
    error,
})

export const fetchQuestionsAndUsers = () => dispatch => {
    // todo: Loading start
    const promises = [_getQuestions(), _getUsers()]

    Promise.all(promises)
        .then(responses => {
            dispatch(fetchUsersSuccessful(responses[1]))
            dispatch(fetchQuestionsSuccessful(responses[0]))
        })
        .catch(err => {
            console.log(err)
            dispatch(fetchQuestionsFailed(err))
            dispatch(fetchUsersFailed(err))
        })
}