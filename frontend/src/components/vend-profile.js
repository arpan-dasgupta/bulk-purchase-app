import React, { Component } from "react";
import axios from "axios";

export default class VProf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      name: "",
      email: "",
      rating: 0,
      num_rating: 0,
      reviews: []
    };
  }

  componentDidMount() {
    if (localStorage.getItem("type") === 1)
      window.location.href = "/vdashboard";
    console.log("yi");

    axios
      .get(
        "http://localhost:4000/user/profile/" +
          localStorage.getItem("vendor_id")
      )
      .then(response => {
        console.log(response);
        // console.log(response.data[0]._id);
        this.setState({
          name: response.data[0].username,
          email: response.data[0].email,
          rating: response.data[0].rating,
          num_rating: response.data[0].num_rating,
          reviews: response.data[0].reviews
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        {this.state.name}
        <br />
        {this.state.email}
        <br />
        {this.state.rating}
        <br />
        {this.state.num_rating}
        <br />
        {this.state.reviews}
      </div>
    );
  }
}
