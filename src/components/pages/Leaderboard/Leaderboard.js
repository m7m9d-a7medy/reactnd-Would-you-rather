import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import UserCard from './UserCard/UserCard'
import { saveRedirectionPath } from '../../../store/actions/redirection'
import { getLeaderboard } from '../../../utils/helpers'

class Leaderboard extends Component {
    render() {
        const { authenticated, leaderboard, dispatch, match } = this.props
        if (!authenticated) {
            dispatch(saveRedirectionPath(match.path))
            return <Redirect to='/auth' />
        }

        return (
            <ul style={{listStyle: 'none'}}>
                {
                    leaderboard.map(user => (
                        <li key={user.id}>
                            <UserCard
                                {...user}
                            />
                        </li>
                    ))
                }
            </ul>
        )
    }
}

const mapStateToProps = ({ authedUserData, users }) => {
    // Check the availability of data required for the rendering process
    if (
        authedUserData !== null
        && Object.keys(users).length !== 0
    ) {
        let leaderboard = getLeaderboard(users)

        return {
            authenticated: authedUserData !== null,
            leaderboard
        }
    } else {
        return {
            authenticated: authedUserData !== null,
            leaderboard: []
        }
    }
}
export default connect(mapStateToProps)(Leaderboard)