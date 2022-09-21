import React, { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Sidebardata } from "./Sidebardata";

function Header() {
  const [width, setWidth] = useState(window.innerWidth);

  const detectSize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [width]);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">PolicyMaker</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto ml-4"></Nav>
          <Nav>
            {width < 950 &&
              Sidebardata.map((val, key) => {
                return (
                  <Nav.Link href={val.link}>
                    <span className="p-3">{val.icon}</span>
                    <span>{val.title}</span>
                  </Nav.Link>
                );
              })}
            <Nav.Link href="#features">
              <span className="p-3">
                <i class="fa-solid fa-circle-info"></i>
              </span>
              <span>About</span>
            </Nav.Link>
            <Nav.Link href="#pricing">
              <span className="p-3">
                <i class="fa-solid fa-question"></i>
              </span>
              <span>Help</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
