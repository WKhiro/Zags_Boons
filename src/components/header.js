import React from "react"
import { Link } from "gatsby"
import Logo from "../images/logo.png"
import { Nav, Navbar } from "react-bootstrap"
import "./header.css"
import "bootstrap/dist/css/bootstrap.css" // Necessary for react-bootstrap

const Header = ({ siteTitle, menuLinks }) => (
  <Navbar expand="xl" variant="dark">
    <Navbar.Brand as={Link} to="/">
      {siteTitle}
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        {menuLinks.map(link => {
          var linkClass = "linkFormat"
          var activeClass = "activeFormat"
          switch (link.name) {
            case "Aphrodite":
              linkClass = "aphrodite"
              activeClass = "aphroditeActive"
              break
            case "Ares":
              linkClass = "ares"
              activeClass = "aresActive"
              break
            case "Artemis":
              linkClass = "artemis"
              activeClass = "artemisActive"
              break
            case "Athena":
              linkClass = "athena"
              activeClass = "athenaActive"
              break
            case "Demeter":
              linkClass = "demeter"
              activeClass = "demeterActive"
              break
            case "Dionysus":
              linkClass = "dionysus"
              activeClass = "dionysusActive"
              break
            case "Poseidon":
              linkClass = "poseidon"
              activeClass = "poseidonActive"
              break
            case "Zeus":
              linkClass = "zeus"
              activeClass = "zeusActive"
              break
            default:
              linkClass = "linkFormat"
          }
          return (
            <Nav.Item>
              <Link
                className={linkClass}
                to={link.link}
                activeClassName={activeClass}
              >
                {link.name}
              </Link>
            </Nav.Item>
          )
        })}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
