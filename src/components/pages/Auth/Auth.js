import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import classes from './Auth.module.css'
import logo from '../../../assets/imgs/logo.png'
import ImageInput from './ImageInput/ImageInput'
import { initAuth } from '../../../store/actions/auth'

class Auth extends Component {
    state = {
        email: '',
        password: '',
        username: '',
        name: '',
        avatarURL: '',
        isSignUp: false
    }

    handleChange = (field, value) => {
        // console.log(field, value)
        this.setState({
            [field]: value
        })
    }

    switchSubmitType = () => {
        this.setState(prevState => ({
            ...prevState,
            isSignUp: !prevState.isSignUp
        }))
    }

    handleSubmit = e => {
        e.preventDefault()
        console.log('Submitted', this.state)

        // todo: dispatch auth action
        this.props.dispatch(initAuth(this.state))
    }

    render() {
        const { email, password, username, name, avatarURL, isSignUp } = this.state
        const { authenticated, redirection } = this.props

        if (authenticated) {
            return <Redirect to={redirection} />
        }

        let signUpFields = null
        if (isSignUp) {
            signUpFields = (
                <Fragment>
                    <ImageInput
                        name='avatarURL'
                        maxHeight={128}
                        className={classes.ImageInput}
                        value={avatarURL}
                        onChange={this.handleChange}
                    />
                    <input
                        className={classes.TextInput}
                        name='username'
                        type='text'
                        placeholder='Username'
                        value={username}
                        onChange={e => this.handleChange('username', e.target.value)}
                        required
                    />
                    <input
                        className={classes.TextInput}
                        name='name'
                        type='text'
                        placeholder='Name'
                        value={name}
                        onChange={e => this.handleChange('name', e.target.value)}
                        required
                    />
                </Fragment>
            )
        }

        return (
            <div className={classes.Auth}>
                <div className={classes.LogoBox}>
                    <img className={classes.Logo} src={logo} alt='Would you rather? logo' />
                </div>
                <form className={classes.Form} onSubmit={this.handleSubmit}>
                    {signUpFields}
                    <input
                        className={classes.TextInput}
                        required
                        name='email'
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={e => this.handleChange('email', e.target.value)}
                    />
                    <input
                        className={classes.TextInput}
                        required
                        name='password'
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={e => this.handleChange('password', e.target.value)}
                    />
                    <button className={classes.Btn} type="submit">
                        {
                            isSignUp ? 'Sign up' : 'Sign in'
                        }
                    </button>
                </form>
                <p className={classes.SwitchLink} onClick={this.switchSubmitType}>
                    {isSignUp ? 'Already have an account?' : 'Register now'}
                </p>
            </div>
        )
    }
}

const mapStateToProps = ({ authedUserData, redirection }) => {
    return {
        authenticated: authedUserData !== null,
        redirection
    }
}

export default connect(mapStateToProps)(Auth)