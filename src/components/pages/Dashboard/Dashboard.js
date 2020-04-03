import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import QuestionCard from './QuestionCard/QuestionCard'

class Dashboard extends Component {
    state = {
        showing: 'unanswered'
    }

    handleTab = e => {
        this.setState({
            showing: e.target.id
        })
    }

    render() {
        const { authenticated, answeredQuestionIds, uansweredQuestionIds } = this.props
        const { showing } = this.state

        if (!authenticated) {
            return <Redirect to='/auth' />
        }

        let renderedQuestionIds = null
        if (showing === 'answered') {
            renderedQuestionIds = answeredQuestionIds
        }
        else {
            renderedQuestionIds = uansweredQuestionIds
        }

        return (
            <div>
                Dashboard
                <button id='answered' onClick={this.handleTab}>
                    Answered
                </button>
                <button id='unanswered' onClick={this.handleTab}>
                    Unanswered
                </button>
                <ul>
                    {
                        renderedQuestionIds.map(id => (
                            <QuestionCard key={id} id={id} />
                        ))
                    }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = ({ authedUserData, questions }) => {
    // Check the availability of data required for the rendering process
    if (authedUserData !== null && Object.keys(questions).length !== 0) {
        const questionIds = Object.keys(questions).sort((a, b) => questions[b].timestamp - questions[a].timestamp)

        const answeredQuestionIds = Object.keys(authedUserData.answers).sort((a, b) => questions[b].timestamp - questions[a].timestamp)
        const uansweredQuestionIds = questionIds.filter(qid => !answeredQuestionIds.includes(qid))

        return {
            authenticated: authedUserData !== null,
            answeredQuestionIds,
            uansweredQuestionIds
        }
    } else {
        return {
            authenticated: authedUserData !== null,
            answeredQuestionIds: [],
            uansweredQuestionIds: []
        }
    }
}

export default connect(mapStateToProps)(Dashboard)