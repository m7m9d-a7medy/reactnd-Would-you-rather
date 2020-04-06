import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import classes from './Question.module.css'
import { saveAnswer } from '../../../store/actions/questions'
import { saveRedirectionPath } from '../../../store/actions/redirection'
import { dummyQuestion } from '../../../utils/helpers'
import NotFound from './NotFound'

class Question extends Component {
    answerHandler = answer => {
        const { id: qid } = this.props.match.params
        const { id: uid, dispatch } = this.props

        // console.log('[Answer], ', qid, uid, answer)
        dispatch(saveAnswer(uid, qid, answer))
    }

    render() {
        const { authenticated, exists, loading, dispatch, location, ...questionData } = this.props
        // Redirect to authentication page if not authenticated
        if (!authenticated) {
            dispatch(saveRedirectionPath(location.pathname))
            return <Redirect to='/auth' />
        }

        // Destructure question data
        const { options, isAnswered, totalVotes, authorName, avatarURL } = questionData
        
        let optionElements = null
        // Check if loading, this check will prevent Errors when choosing an option while the state is not ready yet
        if (!loading) {
            // Check if the question exists
            if (!exists) {
                return <NotFound />
            }
            const clickHandler = !isAnswered
                ? e => this.answerHandler(e.target.id)
                : null

            const selectedOptionClasses = [classes.Option, classes.Selected].join(' ')

            optionElements = Object.keys(options).map(opKey => (
                <div
                    key={opKey}
                    className={isAnswered === opKey ? selectedOptionClasses : classes.Option}
                    id={opKey}
                    onClick={clickHandler}>
                    <p>{options[opKey].text}</p>
                    {isAnswered ? (
                        <p>
                            Votes: {options[opKey].votes.length}, Percentage: {(options[opKey].votes.length * 100 / totalVotes).toFixed(2)}%
                        </p>
                    ) : null}
                </div>
            ))
        }

        return (
            <div className={classes.Question}>
                <p className={classes.QuestionHead}>{authorName} Asks</p>
                <div className={classes.AvatarContainer}>
                    <img className={classes.AvatarImg} src={avatarURL} alt={authorName + ' Avatar'} />
                </div>
                <div className={classes.QuestionBody}>
                    <p style={{ fontWeight: "bold" }}>Would you rather?</p>
                    {optionElements}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ authedUserData, questions, users, loading }, { match }) => {
    // Double check
    if (
        authedUserData
        && Object.keys(questions).length !== 0
        && Object.keys(users).length !== 0
    ) {
        const questionId = match.params.id
        if (questions[questionId]) {
            const { id } = authedUserData
            const { author, optionOne, optionTwo } = questions[questionId]
            const { name: authorName, avatarURL } = users[author]
            const isAnswered = users[id].answers[questionId] ? users[id].answers[questionId] : null
            const totalVotes = optionOne.votes.length + optionTwo.votes.length
            const options = { optionOne, optionTwo }

            return {
                authenticated: authedUserData !== null,
                exists: true,
                loading,
                options, authorName, isAnswered, avatarURL, id, totalVotes
            }
        } else {
            return {
                authenticated: authedUserData !== null,
                exists: false,
                loading,
                ...dummyQuestion
            }
        }
    } else {
        return {
            authenticated: authedUserData !== null,
            loading,
            ...dummyQuestion
        }
    }
}

export default connect(mapStateToProps)(Question)