import { AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT, AUTH_START } from './actionTypes'
import { _signUp, _signIn, _logout, _isSignedIn } from '../../utils/authApi'
import { resetRedirectionPath } from './redirection'
import { resetData } from './shared'

const authStart = () => ({
    type: AUTH_START
})

const authSuccess = authedUserData => ({
    type: AUTH_SUCCESS,
    authedUserData,
})

const authFail = error => ({
    type: AUTH_FAIL,
    error,
})

const authLogout = () => ({
    type: AUTH_LOGOUT
})

export const isSignedIn = () => dispatch => {
    dispatch(authStart())
    _isSignedIn()
        .then(authData => dispatch(authSuccess(authData)))
        .catch(err => dispatch(authFail(err)))
}

export const initAuth = ({ email, password, username, name, avatarURL, isSignUp }) => {
    return dispatch => {
        dispatch(authStart())

        if (isSignUp) {
            _signUp(email, password, username, name, avatarURL)
                .then(res => {
                    dispatch(authSuccess(res))
                    localStorage.setItem('authData', JSON.stringify(res))
                })
                .catch(err => {
                    console.log(err)
                    dispatch(authFail(err))
                })

        } else {
            _signIn(email, password)
                .then(res => {
                    dispatch(authSuccess(res))
                    localStorage.setItem('authData', JSON.stringify(res))
                })
                .catch(err => {
                    console.log(err)
                    dispatch(authFail(err))
                })
        }
    }
}

export const logout = () => {
    return dispatch => {
        dispatch(resetRedirectionPath())
        _logout()
            .then(res => {
                dispatch(authLogout())
                dispatch(resetData())
                localStorage.removeItem('authData')
            })
            .catch(err => console.log(err))
    }
}