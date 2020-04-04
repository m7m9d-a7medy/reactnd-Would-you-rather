import React from 'react'
import classes from './QuestionCard.module.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const QuestionCard = props => {
    const { text, name, avatarURL, id } = props
    // console.log(props)

    return (
        <div className={classes.QuestionCard}>
            <p className={classes.QuestionHead}>{name} Asks</p>
            <div className={classes.AvatarContainer}>
                <img className={classes.AvatarImg} src={avatarURL} alt={name + ' Avatar'} />
            </div>
            <div className={classes.QuestionBody}>
                <p>Would you rather?</p>
                <p>{text}</p>
                <Link className={classes.PollLink} to={`/questions/${id}`}>
                    View poll
                </Link>
            </div>
        </div>
    )
}

const mapStateToProps = ({ users, questions }, { id }) => {
    const { author, optionOne } = questions[id]
    const { name, avatarURL } = users[author]

    return {
        text: `...${optionOne.text.slice(0, optionOne.text.length - 2)}...`,
        name,
        avatarURL,
    }
}

export default connect(mapStateToProps)(QuestionCard)