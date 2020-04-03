import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import UserCard from './UserCard/UserCard'
import { saveRedirectionPath } from '../../../store/actions/redirection'

class Leaderboard extends Component {
    render() {
        const { authenticated, leaderboard, dispatch, match } = this.props
        if (!authenticated) {
            dispatch(saveRedirectionPath(match.path))
            return <Redirect to='/' />
        }

        return (
            <ul>
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
    if (authedUserData !== null && Object.keys(users).length !== 0) {
        let leaderboard = Object.keys(users).sort((userA, userB) => {
            const scoreA = Object.keys(users[userA].answers).length + users[userA].questions.length
            const scoreB = Object.keys(users[userB].answers).length + users[userB].questions.length

            return scoreB - scoreA
        })
            .splice(0, 5)
            .map(userId => ({
                answerCount: Object.keys(users[userId].answers).length,
                questionCount: users[userId].questions.length,
                avatarURL: users[userId].avatarURL,
                name: users[userId].name,
                id: users[userId].id
            }))

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