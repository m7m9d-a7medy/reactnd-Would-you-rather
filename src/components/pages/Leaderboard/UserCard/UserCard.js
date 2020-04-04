import React from 'react'
import classes from './UserCard.module.css'

const UserCard = props => {
    const { name, avatarURL, questionCount, answerCount } = props
    const score = answerCount + questionCount

    return (
        <div className={classes.UserCard}>
            <p className={classes.UserHead}>{name}</p>
            <div className={classes.AvatarContainer}>
                <img className={classes.AvatarImg} src={avatarURL} alt={name + ' Avatar'} />
            </div>
            <div className={classes.ScoreSummary}>
                <p>Answers: {answerCount}</p>
                <p>Questions: {questionCount}</p>
            </div>
            <p className={classes.Score}>
                Total score <span>{score}</span>
            </p>
        </div>
    )
}

export default UserCard
