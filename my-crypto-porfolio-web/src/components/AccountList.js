import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class AccountList extends Component {

  render() {
    let accounts = this.props.accounts || []
    let tableItems = Object.getOwnPropertyNames(accounts).map((accountName, i) =>
      (
        <tr key={i}>
          <td>{accountName}</td>
          <td>{accounts[accountName]}</td>
        </tr>
      )
    )

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
  accounts: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  accounts: state.accounts
})

export default connect(mapStateToProps, {  })(AccountList)
