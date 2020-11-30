import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsersRequest, createtUserRequest, deleteUserRequest, usersError } from "../actions/users";
import NewUserForm from "./NewUserForm";
import UserList from "./UserList";
import { Alert } from 'reactstrap'

class App extends Component {
  constructor(props) {
    super(props);

    this.props.getUsersRequest();
  }

  handleSubmit = ({ firstName, lastName }) => {
    this.props.createtUserRequest({
      firstName,
      lastName
    })
  }

  hendleDeleteUserClick = ( userId ) => {
    this.props.deleteUserRequest(userId)
  }

  handleCloseAlert = () => {
    this.props.usersError({
      error: ''
    })
  }

  render() {
    const users = this.props.users;

    return (
      <div className="App">
        <div style={{ margin: "0 auto", padding: "20px", maxWidth: "600px" }}>
          <Alert color="danger" isOpen={!!this.props.users.error} toggle={this.handleCloseAlert}>
            {this.props.users.error}
          </Alert>
          <NewUserForm  onSubmit={this.handleSubmit}/>
          <UserList users={users.items} onDeleteUser={this.hendleDeleteUserClick}/>
        </div>
      </div>
    );
  }
}

export default connect(({ users }) => ({ users }), {
  getUsersRequest,
  createtUserRequest,
  deleteUserRequest,
  usersError
})(App);
