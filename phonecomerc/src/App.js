import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom"; // Zëvendëso Switch me Routes dhe component me element
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Details from "./components/Details";
import Default from "./components/Default";
import Cart from "./components/Cart";
import Modal from "./components/Modal";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<ProductList />} /> {/* Përdor element në vend të component */}
          <Route path="/details" element={<Details />} />    {/* Përdor element */}
          <Route path="/cart" element={<Cart />} />          {/* Përdor element */}
          <Route path="*" element={<Default />} />           {/* Përdor element */}
        </Routes>
        <Modal />
      </React.Fragment>
    );
  }
}

export default App;