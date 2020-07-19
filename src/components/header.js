import React from "react"
import { Link } from "gatsby"
import Logo from "../images/logo.png"
import "./header.css"
import { Nav, Navbar } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.css" // Necessary for react-bootstrap

const Header = ({ siteTitle, menuLinks }) => (
  <Navbar expand="lg">
    <Navbar.Brand className="navbar-brand" as={Link} to="/">
      {siteTitle}
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        {menuLinks.map(link => (
          <Nav.Item>
            <Link className="linkFormat" to={link.link}>
              {link.name}
            </Link>
          </Nav.Item>
        ))}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
