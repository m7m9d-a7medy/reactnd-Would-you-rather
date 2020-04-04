import React from 'react'
import { Link } from 'react-router-dom'
import classes from '../Layout.module.css'
import { connect } from 'react-redux'
import { logout } from '../../../store/actions/auth'

const CurrentUser = props => {
    const { dispatch, avatarURL, name } = props

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <div className={classes.CurrentUser}>
            <p>Hello, {name}</p>
            <div className={classes.AvatarContainer}>
                <img className={classes.AvatarImg} src={avatarURL} alt='User avatar' />
            </div>
            <Link className={classes.NavigationLink} to='/auth' onClick={logoutHandler}>
                Logout
            </Link>
        </div>
    )
}

const mapStateToProps = ({ authedUserData }) => {
    const { avatarURL, name } = authedUserData ? authedUserData : {}
    return {
        avatarURL,
        name,
    }
}

export default connect(mapStateToProps)(CurrentUser)