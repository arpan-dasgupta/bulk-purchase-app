import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBInput
} from "mdbreact";
import { MDBCol, MDBIcon } from "mdbreact";

export default class MyOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ords: [],
      search: "",
      sort_by: (a, b) => a.price - b.price
    };
    // this.onChangeSearch = this.onChangeSearch.bind(this);
    this.sortPrice = this.sortPrice.bind(this);
    this.sortQuant = this.sortQuant.bind(this);
    this.onOrder = this.onOrder.bind(this);
  }
  sortPrice(e) {
    // prods.sort();
    this.setState({ sort_by: (a, b) => a.productid.price - b.productid.price });
  }
  sortQuant(e) {
    // console.log("ok");
    // prods.sort();
    this.setState({ sort_by: (a, b) => a.quantity - b.quantity });
  }
  //   onChangeSearch(e) {
  // const val = e.target.value;
  // // e.preventDefault();
  // this.setState({ search: val });
  // // console.log(this.state.search);
  // const search = {
  //   productname: val
  // };
  // if (val === "") {
  //   axios
  //     .get("http://localhost:4000/user/all_prods")
  //     .then(response => {
  //       this.setState({ prods: response.data });
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  // } else {
  //   axios
  //     .post("http://localhost:4000/user/search", search)
  //     .then(response => {
  //       this.setState({ prods: response.data });
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  // }
  //   }

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
      .get(
        "http://localhost:4000/user/" +
          localStorage.getItem("id_hash") +
          "/order_stats"
      )
      .then(response => {
        console.log(response.data);
        this.setState({ ords: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        {/* <MDBCol md="6">
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
        </MDBCol> */}
        <MDBDropdown>
          <MDBDropdownToggle caret color="primary">
            Sort Options
          </MDBDropdownToggle>
          <MDBDropdownMenu basic>
            <MDBDropdownItem onClick={this.sortPrice}>
              Sort by Price
            </MDBDropdownItem>
            <MDBDropdownItem onClick={this.sortQuant}>
              Sort by Quantity Remaining
            </MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity Left</th>
              <th>Quantity Ordered</th>
              <th>Price</th>
              <th>Status</th>
              <th>Image</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.ords
              .filter(function(v) {
                return v.productid != null;
              })
              .sort(this.state.sort_by)
              .map((currentOrd, i) => {
                return (
                  <tr>
                    <td>{currentOrd.productid.productname}</td>
                    <td>{currentOrd.productid.quantity}</td>
                    <td>{currentOrd.quantity}</td>
                    <td>{currentOrd.productid.price}</td>
                    <td>{currentOrd.productid.status}</td>
                    <td>
                      <img
                        src={currentOrd.image}
                        width="50%"
                        height="50%"
                      ></img>
                    </td>
                    <td>
                      <Button
                        onClick={this.onOrder}
                        value={currentOrd._id}
                        type="submit"
                      >
                        Edit
                      </Button>
                    </td>
                    <td>
                      <Button
                        onClick={this.onOrder}
                        value={currentOrd._id}
                        type="submit"
                      >
                        Rate
                      </Button>
                    </td>
                    <td>
                      <Button
                        onClick={this.onOrder}
                        value={currentOrd._id}
                        type="submit"
                      >
                        Review
                      </Button>
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
