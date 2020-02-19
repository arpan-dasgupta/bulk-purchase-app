import React, { Component } from "react";
import axios from "axios";
import { MDBCol, MDBIcon } from "mdbreact";

export default class Cdashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { prods: [], search: "" };
    this.onChangeSearch = this.onChangeSearch.bind(this);
  }

  onChangeSearch(e) {
    const val = e.target.value;
    // e.preventDefault();
    this.setState({ search: val });
    // console.log(this.state.search);
    const search = {
      productname: val
    };
    if (val === "") {
      axios
        .get("http://localhost:4000/user/all_prods")
        .then(response => {
          this.setState({ prods: response.data });
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      axios
        .post("http://localhost:4000/user/search", search)
        .then(response => {
          this.setState({ prods: response.data });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }

  componentDidMount() {
    if (localStorage.getItem("type") === 1)
      window.location.href = "/vdashboard";

    axios
      .get("http://localhost:4000/user/all_prods")
      .then(response => {
        this.setState({ prods: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <MDBCol md="6">
          <div className="input-group md-form form-sm form-1 pl-0">
            <div className="input-group-prepend">
              <span
                className="input-group-text purple lighten-3"
                id="basic-text1"
              >
                <MDBIcon className="text-white" icon="search" />
              </span>
            </div>
            <input
              onChange={this.onChangeSearch}
              className="form-control my-0 py-1"
              type="text"
              placeholder="Search for products"
              aria-label="Search"
              value={this.state.search}
            />
          </div>
        </MDBCol>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity Left</th>
              <th>Price</th>
              <th>Status</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {this.state.prods.map((currentProd, i) => {
              return (
                <tr>
                  <td>{currentProd.productname}</td>
                  <td>{currentProd.quantity}</td>
                  <td>{currentProd.price}</td>
                  <td>{currentProd.status}</td>
                  <td>
                    <img src={currentProd.image} width="50%" height="50%"></img>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
