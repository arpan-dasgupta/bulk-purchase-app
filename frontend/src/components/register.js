import React, { Component } from "react";
// import { Button, Form } from "react-bootstrap";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";
import axios from "axios";
// import "../Login.css";
import "font-awesome/css/font-awesome.min.css";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      password2: "",
      switch1: true
    };

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePassword2 = this.onChangePassword2.bind(this);
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.state = { value: "coconut" };
  }

  onChangeUsername(event) {
    this.setState({ username: event.target.value });
  }

  onChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  onChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  onChangePassword2(event) {
    this.setState({ password2: event.target.value });
  }

  handleSwitchChange = nr => () => {
    let switchNumber = `switch${nr}`;
    this.setState({
      [switchNumber]: !this.state[switchNumber]
    });
  };

  onSubmit(e) {
    console.log(this.state);
    // var v;
    // if (!Boolean(this.state.switch1)) v = "1";
    // else v = "2";
    // console.log(v);
    e.preventDefault();

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      user_type: this.state.switch1 ? "1" : "2",
      password: this.state.password,
      password2: this.state.password2
    };
    // console.log(newUser);

    axios
      .post("http://localhost:4000/user/register", newUser)
      .then(res => {
        // console.log(res);
        console.log(res.data);
        alert("Successfully registered");
        window.location.href = "/login";
      })
      .catch(res => {
        console.log(res);
        alert("Invalid Fields / Incomplete fields / Passwords dont match");
      });

    // this.setState({
    //   username: "",
    //   email: ""
    // });
  }

  render() {
    return (
      <div>
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
              <form onSubmit={this.onSubmit}>
                <p className="h5 text-center mb-4">Sign up</p>
                <div className="grey-text">
                  <MDBInput
                    label="Your name"
                    icon="user"
                    group
                    type="text"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                  />
                  <MDBInput
                    label="Your email"
                    icon="envelope"
                    group
                    type="email"
                    validate
                    // error="wrong"
                    // success="right"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                  />
                  <MDBInput
                    label="Password"
                    icon="lock"
                    group
                    type="password"
                    validate
                    value={this.state.password}
                    onChange={this.onChangePassword}
                  />
                  <MDBInput
                    label="Confirm Password"
                    icon="exclamation-triangle"
                    group
                    type="password"
                    validate
                    value={this.state.password2}
                    onChange={this.onChangePassword2}
                  />
                  <div className="custom-control custom-switch">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customSwitches"
                      checked={this.state.switch1}
                      onChange={this.handleSwitchChange(1)}
                      readOnly
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customSwitches"
                    >
                      Register as Vendor
                    </label>
                  </div>
                </div>
                <div className="text-center">
                  <MDBBtn color="primary" type="submit">
                    Register
                  </MDBBtn>
                </div>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}
