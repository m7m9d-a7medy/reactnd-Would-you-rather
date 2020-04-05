import React from 'react'
import { connect } from 'react-redux'
import classes from './Loading.module.css'

const Loading = props => {
    return props.loading && (
        <hr className={classes.Loading} />
    )
}

const mapStateToProps = ({ loading }) => ({ loading })

export default connect(mapStateToProps)(Loading)
