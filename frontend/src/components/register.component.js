import React, { Component } from "react";
// import { Button, Form } from "react-bootstrap";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput,
  MDBDropdownItem,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle
} from "mdbreact";
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
      type: 1
    };

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePassword2 = this.onChangePassword2.bind(this);
    this.onChange = this.onChange.bind(this);
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

  onChange(event) {
    this.setState({ type: event.target.value });
  }

  onSubmit(e) {
    console.log(this.state);
    e.preventDefault();

    const newUser = {
      username: this.state.username,
      email: this.state.email
    };

    axios
      .post("http://localhost:4000/add", newUser)
      .then(res => console.log(res.data));

    this.setState({
      username: "",
      email: ""
    });
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
                  <MDBDropdown size="sm">
                    <MDBDropdownToggle caret color="dark">
                      Register As
                    </MDBDropdownToggle>
                    <MDBDropdownMenu basic>
                      <MDBDropdownItem>Vendor</MDBDropdownItem>
                      <MDBDropdownItem>Customer</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
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
