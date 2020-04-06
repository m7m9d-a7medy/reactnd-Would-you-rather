import { FETCH_DATA_START, FETCH_DATA_SUCCESSFUL, FETCH_DATA_FAILED } from './actionTypes'
import { _getQuestions, _getUsers } from '../../utils/api'

const fetchDataStart = () => ({
    type: FETCH_DATA_START,
})

const fetchDataSuccessful = data => ({
    type: FETCH_DATA_SUCCESSFUL,
    data,
})

const fetchDataFailed = error => ({
    type: FETCH_DATA_FAILED,
    error,
})

export const fetchData = () => dispatch => {
    dispatch(fetchDataStart())
    const promises = [_getQuestions(), _getUsers()]

    Promise.all(promises)
        .then(data => {
            dispatch(fetchDataSuccessful(data))
        })
        .catch(err => {
            console.log(err)
            dispatch(fetchDataFailed(err))
        })
}