import React, { Component } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";

import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBInput
} from "mdbreact";
import { MDBCol, MDBIcon } from "mdbreact";

export default class Cdashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prods: [],
      search: "",
      sort_by: (a, b) => a.price - b.price
    };
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.sortPrice = this.sortPrice.bind(this);
    this.sortQuant = this.sortQuant.bind(this);
    this.sortVend = this.sortVend.bind(this);
    this.onOrder = this.onOrder.bind(this);
    this.visitVendor = this.visitVendor.bind(this);
  }
  sortPrice(e) {
    // prods.sort();
    this.setState({ sort_by: (a, b) => a.price - b.price });
  }
  sortQuant(e) {
    // console.log("ok");
    // prods.sort();
    this.setState({ sort_by: (a, b) => a.quantity - b.quantity });
  }
  sortVend(e) {
    // prods.sort();
    this.setState({
      sort_by: (a, b) =>
        (a.userid.num_rating === 0
          ? 0
          : a.userid.rating / a.userid.num_rating) -
        (b.userid.num_rating === 0 ? 0 : b.userid.rating / b.userid.num_rating)
    });
  }
  visitVendor(e) {
    console.log(e.target);
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

  onOrder(e) {
    const va = prompt("Number of items?");
    console.log(va);
    console.log(e.target.value);
    // e.preventDefault();

    const newProd = {
      pid: e.target.value,
      quantity: va,
      cid: localStorage.getItem("id_hash")
    };

    axios
      .post("http://localhost:4000/user/place_order", newProd)
      .then(res => {
        alert("Ordered Successfully");
        window.location.href = "/dashboard";
      })
      .catch(res => {
        // console.log(res);
        alert("Invalid quantity");
        // console.log("no");
      });
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
        <MDBDropdown>
          <MDBDropdownToggle caret color="primary">
            Sort Options
          </MDBDropdownToggle>
          <MDBDropdownMenu basic>
            <MDBDropdownItem onClick={this.sortPrice}>
              Sort by Price
            </MDBDropdownItem>
            <MDBDropdownItem onClick={this.sortVend}>
              Sort by Vendor Rating
            </MDBDropdownItem>
            <MDBDropdownItem onClick={this.sortQuant}>
              Sort by Quantity Remaining
            </MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
        <Table className="table table-striped">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity Left</th>
              <th>Price</th>
              <th>Status</th>
              <th>Vendor</th>
              <th>Vendor Rating</th>
              <th>Image</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.prods
              .filter(function(v) {
                return v.status === "Waiting";
              })
              .sort(this.state.sort_by)
              .map((currentProd, i) => {
                return (
                  <tr>
                    <td>{currentProd.productname}</td>
                    <td>{currentProd.quantity}</td>
                    <td>{currentProd.price}</td>
                    <td>{currentProd.status}</td>
                    <td>
                      <a
                        href="/profile"
                        onClick={function() {
                          localStorage.setItem(
                            "vendor_id",
                            currentProd.userid._id
                          );
                          console.log("go");
                        }}
                      >
                        {currentProd.userid.username}
                      </a>
                    </td>
                    <td>
                      {currentProd.userid.num_rating === 0
                        ? 0
                        : currentProd.userid.rating /
                          currentProd.userid.num_rating}
                    </td>
                    <td>
                      <img
                        src={currentProd.image}
                        width="50%"
                        height="50%"
                      ></img>
                    </td>
                    <td>
                      <Button
                        onClick={this.onOrder}
                        value={currentProd._id}
                        type="submit"
                      >
                        Order
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    );
  }
}
