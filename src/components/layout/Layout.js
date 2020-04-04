import React, { Fragment } from 'react'
import classes from './Layout.module.css'
import Navigation from './Navigation/Navigation'
import CurrentUser from './CurrentUser/CurrentUser'
import { connect } from 'react-redux'

const Layout = props => {
    const authenticated = props.authenticated
    const { LayoutContainer, Layout, Header, Footer } = classes
    return (
        <div className={Layout}>
            <header className={Header}>
                {
                    authenticated && (
                        <Fragment>
                            <Navigation />
                            <CurrentUser />
                        </Fragment>
                    )
                }
            </header>

            <main className={LayoutContainer}>
                {props.children}
            </main>

            <footer className={Footer}>
                Copyright &copy; Mahmoud Ahmedy 2020
            </footer>
        </div>
    )
}

const mapStateToProps = ({ authedUserData }) => {
    return {
        authenticated: authedUserData !== null
    }
}

export default connect(mapStateToProps)(Layout)