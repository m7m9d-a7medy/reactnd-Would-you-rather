import React from 'react'
import classes from './QuestionCard.module.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const QuestionCard = props => {
    const { text, name, totalVotes, time, avatarURL, id } = props
    // console.log(props)

    return (
        <div className={classes.QuestionCard}>
            <p>Asked by: {name}</p>
            <p>Time: {time}</p>
            <p>Text: {text}</p>
            <p>Votes: {totalVotes}</p>
            <p>Avatar URL: {avatarURL}</p>
            <Link to={`/questions/${id}`}>
                View poll
            </Link>
        </div>
    )
}

const mapStateToProps = ({ users, questions }, { id }) => {
    const { author, optionOne, optionTwo, timestamp } = questions[id]
    const { name, avatarURL } = users[author]
    const totalVotes = optionOne.votes.length + optionTwo.votes.length

    return {
        text: `...${optionOne.text.slice(0, optionOne.text.length - 2)}...`,
        name,
        totalVotes,
        time: new Date(timestamp).toLocaleString(),
        avatarURL,
    }
}

export default connect(mapStateToProps)(QuestionCard)