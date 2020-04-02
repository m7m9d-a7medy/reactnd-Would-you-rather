import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Dashboard extends Component {
    render() {
        const { authenticated } = this.props
        if (!authenticated) {
            return <Redirect to='/' />
        }

        return (
            <div>
                Dashboard
            </div>
        )
    }
}

const mapStateToProps = ({ authedUserData }) => {
    return {
        authenticated: authedUserData !== null
    }
}

export default connect(mapStateToProps)(Dashboard)