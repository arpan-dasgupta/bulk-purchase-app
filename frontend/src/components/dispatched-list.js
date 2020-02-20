import React, { Component } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import "font-awesome/css/font-awesome.min.css";
// import Navbar from "./navbar";

export default class DispProds extends Component {
  constructor(props) {
    super(props);
    this.state = { prods: [] };
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(e) {
    // console.log(e);
    console.log(e.target.value);
    e.preventDefault();

    const newProd = { vid: localStorage.getItem("id_hash") };

    axios
      .post(
        "http://localhost:4000/user/" + e.target.value + "/cancel_item",
        newProd
      )
      .then(res => {
        alert("Product Deleted Successfully");
        window.location.href = "/vproductlist";
      })
      .catch(res => {
        console.log(res);
        console.log("no");
      });
  }

  componentDidMount() {
    if (localStorage.getItem("type") === 1)
      window.location.href = "/vdashboard";

    axios
      .get(
        "http://localhost:4000/user/" +
          localStorage.getItem("id_hash") +
          "/get_items"
      )
      .then(response => {
        this.setState({ prods: response.data });
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Table variant="dark" className="table table-striped">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity Left</th>
              <th>Price</th>
              <th>Status</th>
              <th>Image</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.prods
              .filter(function(v) {
                return v.status === "Dispatched";
              })
              .map((currentProd, i) => {
                return (
                  <tr>
                    <td>{currentProd.productname}</td>
                    <td>{currentProd.quantity}</td>
                    <td>{currentProd.price}</td>
                    <td>{currentProd.status}</td>
                    <td>
                      <img
                        src={currentProd.image}
                        width="50%"
                        height="50%"
                      ></img>
                    </td>
                    <td>
                      <Button
                        type="delete"
                        value={currentProd._id}
                        onClick={this.onDelete}
                      >
                        Dispatch
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
