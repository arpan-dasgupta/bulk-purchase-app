import React, { Component } from "react";
// import { Button, Form } from "react-bootstrap";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";
import axios from "axios";
import "font-awesome/css/font-awesome.min.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.state = { value: "coconut" };
  }

  onChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  onChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  onSubmit(e) {
    console.log(this.state);
    // var v;
    // if (!Boolean(this.state.switch1)) v = "1";
    // else v = "2";
    // console.log(v);
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post("http://localhost:4000/user/login", newUser)
      .then(res => {
        // console.log(res);
        console.log(res.data);
        console.log("yo");
        localStorage.setItem("id_hash", res.data.id);
        localStorage.setItem("type", res.data.type);
        alert("Successfully logged in");
        window.location.href = "/dashboard";
      })
      .catch(res => {
        console.log(res);
        console.log("no");
        alert("No Such User");
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
                <p className="h5 text-center mb-4">Login</p>
                <div className="grey-text">
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
                </div>
                <div className="text-center">
                  <MDBBtn color="primary" type="submit">
                    Login
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
