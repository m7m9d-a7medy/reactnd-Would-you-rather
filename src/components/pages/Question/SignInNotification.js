import React from 'react'
import { Link } from 'react-router-dom'

const SignInNotification = props => {
    return (
        <div style={{
            fontSize: '1.8rem',
            textAlign: 'center'
        }}>
            Sign in to view this poll.

            <Link to='/auth' style={{
                color: 'black',
                display: 'block',
                marginTop: '1rem'
            }}>
                Sign In
            </Link>
        </div>
    )
}

export default SignInNotification
