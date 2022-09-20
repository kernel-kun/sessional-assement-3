import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import logoUrl from "../assets/logo.svg";

const Header = ({ title }) => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand
            className="d-flex align-items-center gap-3"
            href="#home"
          >
            <img
              alt=""
              src={logoUrl}
              height="35"
              className="d-inline-block align-top"
            />
            {title}
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
