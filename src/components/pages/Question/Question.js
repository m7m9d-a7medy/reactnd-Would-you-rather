import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import classes from './Question.module.css'
import { saveAnswer } from '../../../store/actions/questions'

class Question extends Component {
    answerHandler = option => {
        const { id: qid } = this.props.match.params
        const { id: uid, dispatch } = this.props

        console.log('[Answer], ', qid, uid, option)
        dispatch(saveAnswer(uid, qid, option))
    }

    render() {
        const { authenticated, optionOne, optionTwo, timestamp, authorName, avatarURL, isAnswered } = this.props

        if (!authenticated) {
            return <Redirect to='/' />
        }

        const clickHandler = !isAnswered
            ? e => this.answerHandler(e.target.id)
            : null

        return (
            <div className={classes.Question}>
                <p>Asked by: {authorName}</p>
                <p id='optionOne' onClick={clickHandler}>Option 1: {optionOne.text}, Votes: {optionOne.votes.length}</p>
                <p id='optionTwo' onClick={clickHandler}>Option 2: {optionTwo.text}, Votes: {optionTwo.votes.length}</p>
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
            optionOne, optionTwo, timestamp, authorName, isAnswered, avatarURL, id
        }
    } else {
        return {
            authenticated: authedUserData !== null
        }
    }
}

export default connect(mapStateToProps)(Question)