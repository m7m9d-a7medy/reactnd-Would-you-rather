import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import classes from './Navigation.module.css'

const Navigation = props => {
    return (
        <nav className={classes.Navigation}>
            <Link to='/dashboard'>Dashboard</Link>
            <Link to='/add'>New Question</Link>
            <Link to='/leaderboard'>Leaderboard</Link>
        </nav>
    )
}

const mapStateToProps = ({ authedUserData }) => {
    return {
        authenticated: authedUserData !== null
    }
}

export default connect(mapStateToProps)(Navigation)