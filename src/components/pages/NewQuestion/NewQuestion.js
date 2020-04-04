import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import classes from './NewQuestion.module.css'
import { newQuestion } from '../../../store/actions/questions'
import { saveRedirectionPath } from '../../../store/actions/redirection'

class NewQuestion extends Component {
    state = {
        optionOneText: '',
        optionTwoText: '',
        valid: false,
        submitted: false
    }

    handleChange = e => {
        const { id: field, value } = e.target

        this.setState({
            [field]: value
        })
    }

    submitNewQuestion = e => {
        e.preventDefault()
        console.log('[NewQuestion]', this.state)
        const { dispatch, author } = this.props
        const { optionOneText, optionTwoText } = this.state

        dispatch(newQuestion({ optionOneText, optionTwoText, author }))
        this.setState({ submitted: true })
    }

    render() {
        const { authenticated, match, dispatch } = this.props
        const { optionOneText, optionTwoText, submitted } = this.state
        if (!authenticated) {
            dispatch(saveRedirectionPath(match.path))
            return <Redirect to='/auth' />
        }

        if (submitted) {
            return <Redirect to='/' />
        }

        const valid = optionOneText && optionTwoText && true

        return (
            <form onSubmit={this.submitNewQuestion} className={classes.NewQuestion}>

                <p>Would you rather?</p>
                <input
                    className={classes.Option}
                    type='text'
                    placeholder='Option One'
                    required
                    id='optionOneText'
                    onChange={this.handleChange}
                    value={optionOneText}
                />
                <p>Or</p>
                <input
                    className={classes.Option}
                    type='text'
                    placeholder='Option Two'
                    required
                    id='optionTwoText'
                    onChange={this.handleChange}
                    value={optionTwoText}
                />
                <button className={classes.Button} type='submit' disabled={!valid}>
                    Submit
                </button>
            </form>
        )
    }
}

const mapStateToProps = ({ authedUserData }) => {
    return {
        authenticated: authedUserData !== null,
        author: authedUserData ? authedUserData.id : null
    }
}

export default connect(mapStateToProps)(NewQuestion)