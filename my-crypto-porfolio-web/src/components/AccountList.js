import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { removeAccount } from '../actions/accountActions'

class AccountList extends Component {

  remove(account) {
    return () => {
      this.props.remove(account)
    }
  }

  render() {
    let accounts = this.props.accounts || []
    let tableItems = Object.getOwnPropertyNames(accounts).map((account, i) => {
      return (
        <tr key={i}>
          <td>{account}</td>
          <td>{accounts[account]}</td>
          <td>
            <button onClick={this.remove.bind(this)(account)}>Remove</button>
          </td>
        </tr>
      )
    })

    return (
      <div>
        <div className="row">
          <h3>Account List</h3>
        </div>
        <div className="row">
          <table className="table table-hover">
            <tbody>
            {tableItems}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

AccountList.propTypes = {
  accounts: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  accounts: state.accounts
})

const mapDispatchToProps = dispatch => ({
  remove: account => dispatch(removeAccount(account))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountList)
