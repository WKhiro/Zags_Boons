import React from "react"
import { Link } from "gatsby"
import { Nav, Navbar } from "react-bootstrap"
import "./header.css"
import "bootstrap/dist/css/bootstrap.css" // Necessary for react-bootstrap
import { v4 as uuidv4 } from "uuid"

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
              linkClass = "aphroditeHeader"
              activeClass = "aphroditeActive"
              break
            case "Ares":
              linkClass = "aresHeader"
              activeClass = "aresActive"
              break
            case "Artemis":
              linkClass = "artemisHeader"
              activeClass = "artemisActive"
              break
            case "Athena":
              linkClass = "athenaHeader"
              activeClass = "athenaActive"
              break
            case "Demeter":
              linkClass = "demeterHeader"
              activeClass = "demeterActive"
              break
            case "Dionysus":
              linkClass = "dionysusHeader"
              activeClass = "dionysusActive"
              break
            case "Poseidon":
              linkClass = "poseidonHeader"
              activeClass = "poseidonActive"
              break
            case "Zeus":
              linkClass = "zeusHeader"
              activeClass = "zeusActive"
              break
            default:
              linkClass = "linkFormat"
          }
          return (
            <Nav.Item key={uuidv4()}>
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
