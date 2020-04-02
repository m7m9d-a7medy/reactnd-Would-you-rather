import { AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT } from './actionTypes'
import { _signUp, _signIn, _logout } from '../../utils/authApi'

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

export const initAuth = ({ email, password, username, name, avatarURL, isSignUp }) => {
    return dispatch => {

        if (isSignUp) {
            _signUp(email, password, username, name, avatarURL)
                .then(res => {
                    dispatch(authSuccess(res))
                    // todo: Loading end
                })
                .catch(err => {
                    console.log(err)
                    dispatch(authFail({}))
                })

        } else {
            _signIn(email, password)
                .then(res => {
                    dispatch(authSuccess(res))
                })
                .catch(err => {
                    console.log(err)
                    dispatch(authFail())
                })
        }
    }
}

export const logout = () => {
    return dispatch => {
        _logout()
            .then(res => {
                dispatch(authLogout())
            })
            .catch(err => console.log(err))
    }
}