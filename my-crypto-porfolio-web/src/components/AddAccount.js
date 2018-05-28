import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addAccount } from '../actions/accountActions'

class AddAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: ''
    }
  }

  onChange(e) {
    this.setState({ account: e.target.value})
  }

  addAccount(e) {
    this.props.addAccount(this.state.account)
  }

  render() {
    return (
      <div className="row">
        <h3>Add account</h3>
        <div className="input-group">
          <input id="accountInput" type="text" className="form-control" placeholder="Account" aria-label="Account" aria-describedby="basic-addon2"
          onChange={this.onChange.bind(this)}>
          </input>
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button"
            onClick={this.addAccount.bind(this)}
            >Add account</button>
          </div>
        </div>
      </div>
    )
  }
}

AddAccount.propTypes = {
  addAccount: PropTypes.func.isRequired
}

export default connect(null, { addAccount })(AddAccount)
