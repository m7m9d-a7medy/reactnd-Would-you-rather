import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import classes from './Question.module.css'

class Question extends Component {
    render() {
        const { authenticated, optionOne, optionTwo, timestamp, authorName, avatarURL, isAnswered } = this.props

        if (!authenticated) {
            return <Redirect to='/' />
        }

        return (
            <div className={classes.Question}>
                <p>Asked by: {authorName}</p>
                <p>Option 1: {optionOne.text}, Votes: {optionOne.votes.length}</p>
                <p>Option 2: {optionTwo.text}, Votes: {optionTwo.votes.length}</p>
                <p>Time: {new Date(timestamp).toLocaleDateString()}</p>
                <p>Answered: {isAnswered}</p>
                <div style={{
                    background: `url(${avatarURL})`,
                    height: 128,
                    width: 128
                }}></div>
            </div>
        )
    }
}

const mapStateToProps = ({ authedUserData, questions, users }, { match }) => {
    if (authedUserData) {
        const questionId = match.params.id
        const { id } = authedUserData
        const { author, optionOne, optionTwo, timestamp } = questions[questionId]
        const { name: authorName, avatarURL } = users[author]
        const isAnswered = users[id].answers[questionId] ? users[id].answers[questionId] : null

        return {
            authenticated: authedUserData !== null,
            optionOne, optionTwo, timestamp, authorName, isAnswered, avatarURL
        }
    } else {
        return {
            authenticated: authedUserData !== null
        }
    }
}

export default connect(mapStateToProps)(Question)