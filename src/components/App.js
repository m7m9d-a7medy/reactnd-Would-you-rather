import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import Auth from './pages/Auth/Auth'
import Dashboard from './pages/Dashboard/Dashboard'
import Navigation from './layout/navigation/Navigation'
import Question from './pages/Question/Question'
import NewQuestion from './pages/NewQuestion/NewQuestion'
import Leaderboard from './pages/Leaderboard/Leaderboard'
import { fetchQuestionsAndUsers } from '../store/actions/shared'

class App extends Component {
  componentDidUpdate() {
    const { authenticated, dispatch } = this.props
    if (authenticated) {
      dispatch(fetchQuestionsAndUsers())
    }
  }

  render() {
    return (
      <div>
        <Navigation />
        <Switch>
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/auth' component={Auth} />
          <Route path='/questions/:id' component={Question} />
          <Route path='/add' component={NewQuestion} />
          <Route path='/leaderboard' component={Leaderboard} />
          <Redirect to='/auth' />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = ({ authedUserData }) => {
  return {
    authenticated: authedUserData !== null
  }
}

export default connect(mapStateToProps)(App)