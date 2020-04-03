import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import classes from './NewQuestion.module.css'
import { newQuestion } from '../../../store/actions/questions'

class NewQuestion extends Component {
    state = {
        optionOneText: '',
        optionTwoText: '',
        valid: false
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
        // todo: Save question to database
        dispatch(newQuestion({optionOneText, optionTwoText, author}))
    }

    render() {
        const { authenticated } = this.props
        const { optionOneText, optionTwoText } = this.state
        if (!authenticated) {
            return <Redirect to='/' />
        }

        const valid = optionOneText && optionTwoText && true

        return (
            <div className={classes.NewQuestion}>
                <form onSubmit={this.submitNewQuestion}>
                    <input
                        type='text'
                        placeholder='Option One'
                        required
                        id='optionOneText'
                        onChange={this.handleChange}
                        value={optionOneText}
                    />
                    <input
                        type='text'
                        placeholder='Option Two'
                        required
                        id='optionTwoText'
                        onChange={this.handleChange}
                        value={optionTwoText}
                    />
                    <button type='submit' disabled={!valid}>
                        Submit
                    </button>
                </form>
            </div>
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