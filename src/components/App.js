import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import Layout from './layout/Layout'
import Auth from './pages/Auth/Auth'
import { fetchData } from '../store/actions/shared'
import { isSignedIn } from '../store/actions/auth'
import asyncComponent from './hoc/asyncComponent'

// Lazy loading
const Dashboard = asyncComponent(() => import('./pages/Dashboard/Dashboard'))
const Question = asyncComponent(() => import('./pages/Question/Question'))
const NewQuestion = asyncComponent(() => import('./pages/NewQuestion/NewQuestion'))
const Leaderboard = asyncComponent(() => import('./pages/Leaderboard/Leaderboard'))

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