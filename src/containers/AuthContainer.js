import React, { Component, PropTypes } from 'react'

class AuthContainer extends Component {

  render () {
    return (
       <div>    {React.cloneElement(this.props.children, {})}</div>
    )
  }
}

export default AuthContainer
