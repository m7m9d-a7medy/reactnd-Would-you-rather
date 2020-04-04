import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import classes from '../Layout.module.css'

const Navigation = props => {
    return (
        <nav className={classes.Navigation}>
            <Link className={classes.NavigationLink} to='/dashboard'>Dashboard</Link>
            <Link className={classes.NavigationLink} to='/add'>New Question</Link>
            <Link className={classes.NavigationLink} to='/leaderboard'>Leaderboard</Link>
        </nav>
    )
}

const mapStateToProps = ({ authedUserData }) => {
    return {
        authenticated: authedUserData !== null
    }
}

export default connect(mapStateToProps)(Navigation)