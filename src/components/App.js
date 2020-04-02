import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../store/actions/auth'
import { Switch, Route, Redirect } from 'react-router-dom'
import Auth from './pages/Auth/Auth'
import Dashboard from './pages/Dashboard/Dashboard'
import Navigation from './layout/navigation/Navigation'

class App extends Component {
  logout = () => {
    this.props.dispatch(logout())
  }

  render() {
    return (
      <div>
        <Navigation />
        <Switch>
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/auth' component={Auth} />
          <Route path='/questions/:id' render={() => <p>Question</p>} />
          <Route path='/add' render={() => <p>New Question</p>} />
          <Route path='/leaderboard' render={() => <p>Leaderboard</p>} />
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