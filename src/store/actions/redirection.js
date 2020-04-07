import { SAVE_REDIRECTION_PATH, RESET_REDIRECTION_PATH } from './actionTypes'

export const saveRedirectionPath = (path) => ({
    type: SAVE_REDIRECTION_PATH,
    path,
})

export const resetRedirectionPath = (path) => ({
    type: RESET_REDIRECTION_PATH
})