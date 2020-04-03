import React from 'react'
import classes from './UserCard.module.css'

const UserCard = props => {
    const { name, avatarURL, questionCount, answerCount } = props
    const score = answerCount + questionCount

    return (
        <div className={classes.UserCard}>
            <p>Name: {name}</p>
            <p>Avatar: {avatarURL}</p>
            <p>questionCount: {questionCount}</p>
            <p>answerCount: {answerCount}</p>
            <p>Avatar URL: {avatarURL}</p>
            <p>score: {score}</p>
        </div>
    )
}

export default UserCard
