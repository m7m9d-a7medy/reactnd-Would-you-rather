import firebase from '../../utils/firebase'
import { AUTH_SUCCESS, AUTH_FAIL } from './actionTypes'

const authSucces = authedUserData => ({
    type: AUTH_SUCCESS,
    authedUserData,
})

const authFail = authError => ({
    type: AUTH_FAIL,
    authError,
})

const authFailHandler = (dispatch, err) => {
    console.log(err)
    dispatch(authFail(err))
    // todo: Loading end
}

export const initAuth = ({ email, password, username, avatarURL, isSignUp }) => {
    return dispatch => {

        if (isSignUp) {

            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(userCredintial => {
                    userCredintial.user.updateProfile({
                        profile: username,
                        photoURL: avatarURL
                    })
                        .then(() => {
                            dispatch(authSucces(email, password, username, avatarURL))
                            // todo: Loading end
                        })
                        .catch(reason => authFailHandler(dispatch, reason))
                })
                .catch(err => authFailHandler(err.message))

        } else {

            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(() => {
                    dispatch(authSucces(email, password, username, avatarURL))
                    // todo: Loading end
                })
                .catch(reason => authFailHandler(dispatch, reason))
        }
    }
}