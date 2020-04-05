import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import Modal from '../UI/Modal/Modal'
import { clearError } from '../../store/actions/error'

const ErrorBoundary = props => {
    const errorConfirmedHandler = () => {
        props.dispatch(clearError())
    }

    return (
        <Fragment>
            <Modal
                show={props.error}
                modalClosed={errorConfirmedHandler}
            >
                {props.error ? props.message : null}
            </Modal>
            {props.children}
        </Fragment>
    )
}

const mapStateToProps = ({ error }) => ({ error })

export default connect(mapStateToProps)(ErrorBoundary)