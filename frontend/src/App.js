import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import UsersList from "./components/users-list";
import Login from "./components/login";
import Register from "./components/register";
import Dashboard from "./components/dashboard";
import MyNavbar, { VendorNavbar, CustomerNavbar } from "./components/navbar";
import ProductForm from "./components/vproduct-add";
import MyProds from "./components/vproduct-list";
import ReadyProds from "./components/ready-list";
import DispProds from "./components/dispatched-list";
import MyOrders from "./components/myorders";

function App() {
  var nb;
  if (localStorage.getItem("type") === "2")
    nb = <CustomerNavbar></CustomerNavbar>;
  else if (localStorage.getItem("type") === "1")
    nb = <VendorNavbar></VendorNavbar>;
  else nb = <MyNavbar></MyNavbar>;
  return (
    <Router>
      <div className="container">
        {nb}
        <br />
        <Route path="/" exact component={UsersList} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/addproduct" component={ProductForm} />
        <Route path="/vproductlist" component={MyProds} />
        <Route path="/readyprod" component={ReadyProds} />
        <Route path="/dispprod" component={DispProds} />
        <Route path="/myorders" component={MyOrders} />
        {/* <Route path="/vdashboard" component={Vdashboard} /> */}
      </div>
    </Router>
  );
}

export default App;
