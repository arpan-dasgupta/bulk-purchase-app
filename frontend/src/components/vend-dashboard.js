import React, { Component } from "react";
import axios from "axios";

export default class Vdashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  componentDidMount() {
    if (localStorage.getItem("type") == 2) window.location.href = "/cdashboard";

    axios
      .get("http://localhost:4000/")
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((currentUser, i) => {
              return (
                <tr>
                  <td>{currentUser.username}</td>
                  <td>{currentUser.email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
