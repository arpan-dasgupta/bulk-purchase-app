import React, { Component } from "react";
// import { Button, Form } from "react-bootstrap";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";
import axios from "axios";
// import "../Login.css";
import "font-awesome/css/font-awesome.min.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: ""
    };

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeUsername(event) {
    this.setState({ username: event.target.value });
  }

  onChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  onSubmit(e) {
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
              <form>
                <p className="h5 text-center mb-4">Sign up</p>
                <div className="grey-text">
                  <MDBInput
                    label="Your name"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label="Your email"
                    icon="envelope"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label="Confirm your email"
                    icon="exclamation-triangle"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label="Your password"
                    icon="lock"
                    group
                    type="password"
                    validate
                  />
                </div>
                <div className="text-center">
                  <MDBBtn color="primary">Register</MDBBtn>
                </div>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}
