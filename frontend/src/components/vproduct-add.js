import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";
import axios from "axios";
import "font-awesome/css/font-awesome.min.css";
// import Navbar from "./navbar";

export default class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      quantity: "",
      price: "",
      image: null
    };

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChangeName(event) {
    this.setState({ name: event.target.value });
  }

  onChangeQuantity(event) {
    this.setState({ quantity: event.target.value });
  }

  onChangePrice(event) {
    this.setState({ price: event.target.value });
  }

  onChangeImage(event) {
    var self = this;
    var reader = new FileReader();
    var file = event.target.files[0];

    reader.onload = function(upload) {
      self.setState({
        image: upload.target.result
      });
    };

    reader.readAsDataURL(file);
  }

  onSubmit(e) {
    console.log(this.state);
    e.preventDefault();

    const newProd = {
      name: this.state.name,
      quantity: this.state.quantity,
      price: this.state.price,
      image: this.state.image
    };

    axios
      .post(
        "http://localhost:4000/user/" +
          localStorage.getItem("id_hash") +
          "/add_item",
        newProd
      )
      .then(res => {
        // console.log(res);
        // console.log(res.data);
        // console.log("yo");
        // localStorage.setItem("id_hash", res.data.id);
        // localStorage.setItem("type", res.data.type);
        alert("Product Added Successfully");
        window.location.href = "/addproduct";
      })
      .catch(res => {
        console.log(res);
        console.log("no");
      });
  }

  componentDidMount() {
    if (localStorage.getItem("type") === 2) window.location.href = "/dashboard";
    // console.log("yi");
  }

  render() {
    return (
      <div>
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
              <Form onSubmit={this.onSubmit}>
                <p className="h5 text-center mb-4">Add Product</p>
                <div className="grey-text">
                  <MDBInput
                    label="Product Name"
                    icon="chevron-circle-right"
                    group
                    validate
                    type="text"
                    value={this.state.name}
                    onChange={this.onChangeName}
                  />
                  <MDBInput
                    label="Price per item"
                    icon="chevron-circle-right"
                    type="number"
                    group
                    value={this.state.price}
                    onChange={this.onChangePrice}
                  />
                  <MDBInput
                    label="Quantity"
                    icon="chevron-circle-right"
                    type="number"
                    group
                    value={this.state.quantity}
                    onChange={this.onChangeQuantity}
                  />
                  <MDBInput
                    // label="Image Link (Opt.)"
                    icon="chevron-circle-right"
                    type="file"
                    group
                    // value={this.state.image}
                    onChange={this.onChangeImage}
                  />
                </div>
                <div className="text-center">
                  <MDBBtn color="primary" type="submit">
                    Add
                  </MDBBtn>
                </div>
              </Form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}
