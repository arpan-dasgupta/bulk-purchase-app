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
    this.onEdit = this.onEdit.bind(this);
    this.onRate = this.onRate.bind(this);
    this.onReview = this.onReview.bind(this);
  }
  sortPrice(e) {
    this.setState({ sort_by: (a, b) => a.productid.price - b.productid.price });
  }
  sortQuant(e) {
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

  onEdit(e) {
    const va = prompt("Number of items?");
    console.log(va);
    console.log(e.target.value);
    // console.log(e.target.value[0]);
    // console.log(e.target.value[1]);
    // e.preventDefault();

    const newProd = {
      oid: e.target.value,
      quantity: va,
      cid: localStorage.getItem("id_hash")
    };

    axios
      .post("http://localhost:4000/user/edit_order", newProd)
      .then(res => {
        alert("Updated Successfully");
        window.location.href = "/myorders";
      })
      .catch(res => {
        // console.log(res);
        alert("Invalid quantity");
        // console.log("no");
      });
  }

  onRate(e) {
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

  onReview(e) {
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
        <br></br>
        <h4>Waiting Products</h4>
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
                return v.productid != null && v.productid.status == "Waiting";
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
                        onClick={this.onEdit}
                        value={currentOrd._id}
                        type="submit"
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
          <br></br>
          <h4>Ready Products</h4>
        </table>
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
                return v.productid != null && v.productid.status == "Ready";
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
                        onClick={this.onEdit}
                        value={currentOrd._id}
                        type="submit"
                      >
                        Edit
                      </Button>
                    </td>
                    <td>
                      <Button
                        onClick={this.onRate}
                        value={currentOrd._id}
                        type="submit"
                      >
                        Rate
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <br></br>
        <h4>Dispatched Products</h4>
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
                return (
                  v.productid != null && v.productid.status == "Dispatched"
                );
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
                        onClick={this.onRate}
                        value={currentOrd._id}
                        type="submit"
                      >
                        Rate
                      </Button>
                    </td>
                    <td>
                      <Button
                        onClick={this.onReview}
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
        <br></br>
        <h4>Cancelled Products</h4>
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
                return v.productid != null && v.productid.status == "Cancelled";
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
                        onClick={this.onRate}
                        value={currentOrd._id}
                        type="submit"
                      >
                        Rate
                      </Button>
                    </td>
                    <td>
                      <Button
                        onClick={this.onReview}
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
