import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { fetchQuestionsAndUsers } from '../../../store/actions/shared'
import QuestionCard from './QuestionCard/QuestionCard'

class Dashboard extends Component {
    componentDidMount() {
        const { authenticated, dispatch } = this.props
        if (authenticated) {
            dispatch(fetchQuestionsAndUsers())
        }
    }

    render() {
        const { authenticated, questionIds } = this.props
        if (!authenticated) {
            return <Redirect to='/' />
        }

        return (
            <div>
                Dashboard
                <ul>
                    {
                        questionIds.map(id => (
                            <QuestionCard key={id} id={id} />
                        ))
                    }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = ({ authedUserData, questions }) => {
    
    return {
        authenticated: authedUserData !== null,
        questionIds: Object.keys(questions).sort((a, b) => questions[a].timestamp - questions[b].timestamp)
    }
}

export default connect(mapStateToProps)(Dashboard)