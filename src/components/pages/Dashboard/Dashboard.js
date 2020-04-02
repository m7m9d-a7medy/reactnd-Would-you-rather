import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { fetchQuestions } from '../../../store/actions/questions'

class Dashboard extends Component {
    componentDidMount() {
        const { authenticated, dispatch } = this.props
        if (authenticated) {
            dispatch(fetchQuestions())
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
                        questionIds.map(id => <li key={id}>{id}</li>)
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