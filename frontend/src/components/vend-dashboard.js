import React, { Component } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

export default class Vdashboard extends Component {
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
    // e.preventDefault();

    if (localStorage.getItem("type") === 2)
      window.location.href = "/cdashboard";
    console.log("yi");

    axios
      .get(
        "http://localhost:4000/user/profile/" + localStorage.getItem("id_hash")
      )
      .then(response => {
        console.log(response);
        // console.log(response.data[0]._id);
        this.setState({
          name: response.data[0].username,
          email: response.data[0].email,
          rating: response.data[0].rating,
          num_rating: response.data[0].num_rating
          // reviews: response.data[0].reviews
        });
      })
      .catch(function(error) {
        console.log(error);
      });

    const newProd = { vid: localStorage.getItem("id_hash") };

    axios
      .post("http://localhost:4000/user/get_vend_reviews", newProd)
      .then(response => {
        console.log(response.data);
        this.setState({ reviews: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h3>
          Name{" : "}
          {this.state.name}
        </h3>
        {/* Yo */}
        <br />
        <h3>
          Email{" : "} {this.state.email}
        </h3>
        <br />
        <h3>
          Rating{" : "}
          {this.state.num_rating == 0
            ? 0
            : this.state.rating / this.state.num_rating}
        </h3>
        <br />
        {/* {this.state.reviews} */}
        <h3>Reviews</h3>
        <Table className="table table-striped">
          <thead>
            <tr>
              <th>Product Name</th>
              {/* <th></th> */}
              <th>Review</th>
            </tr>
          </thead>
          <tbody>
            {this.state.reviews.map((currentProd, i) => {
              return (
                <tr>
                  <td>{currentProd.productid.productname}</td>
                  <td>{currentProd.review}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}
