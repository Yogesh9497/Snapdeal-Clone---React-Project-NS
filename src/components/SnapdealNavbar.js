import React from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import logo from "../snapdeal_logo.png";
import { logout } from '../redux/reducer/authorisation';


// import { addItem } from '../src/redux/reducer/cartSlice'
const SnapdealNavbar = () => {

  const dispatch = useDispatch();

  const items = useSelector(state => state.cart.items)

  return (
    <Navbar bg="danger" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logo}
            alt="Snapdeal Logo"
            height="40"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
          <Form inline="true" className="mx-auto grid">
            <FormControl
              type="text"
              placeholder="Brand Waali Quality, Bazaar Waali Deal!"
              className="mr-sm-2"
              style={{ width: '400px' }}
              disabled
            />
            {/* <Button variant="primary" className="fw-bold">
              Search
            </Button> */}
          </Form>
          <Nav className="ml-auto">
            <Nav.Link href="/cart" className="fw-bold" >
              {items.length > 0 && items.length}
              <FaShoppingCart className="me-1" />
            </Nav.Link>
            <Button style={{marginLeft: "30px"}}
              className="dropdown-item small"
              onClick={() => dispatch(logout())}
            >
              <FaUser className="me-1" />
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default SnapdealNavbar;
