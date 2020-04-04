import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import Layout from './Layout/Layout'
import Auth from './pages/Auth/Auth'
import Dashboard from './pages/Dashboard/Dashboard'
import Question from './pages/Question/Question'
import NewQuestion from './pages/NewQuestion/NewQuestion'
import Leaderboard from './pages/Leaderboard/Leaderboard'
import { fetchData } from '../store/actions/shared'
import { isSignedIn } from '../store/actions/auth'

class App extends Component {
  componentDidUpdate() {
    const { authenticated, dispatch } = this.props
    if (authenticated) {
      dispatch(fetchData())
    }
  }

  componentDidMount() {
    this.props.dispatch(isSignedIn())
  }

  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/auth' component={Auth} />
          <Route path='/questions/:id' component={Question} />
          <Route path='/add' component={NewQuestion} />
          <Route path='/leaderboard' component={Leaderboard} />
          <Redirect to='/' />
        </Switch>
      </Layout>
    )
  }
}

const mapStateToProps = ({ authedUserData }) => {
  return {
    authenticated: authedUserData !== null
  }
}

export default connect(mapStateToProps)(App)