import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = props => {
    return (
        <div style={{
            fontSize: '1.8rem',
            textAlign: 'center'
        }}>
            Error 404: Question not found.

            <Link to='/' style={{
                color: 'black',
                display: 'block',
                marginTop: '1rem'
            }}>
                Go back
            </Link>
        </div>
    )
}

export default NotFound
