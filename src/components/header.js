import React from "react"
import { Link } from "gatsby"
import Logo from "../images/logo.png"
import "./header.css"

const Header = ({ siteTitle, menuLinks }) => (
  <header
    style={{
      background: "rebeccapurple",
      marginBottom: "1.45rem",
    }}
  >
    <h1 style={{ margin: 0, flex: 1 }}>
      <Link to="/">
        <img className="logoFormat" src={Logo} alt="" />
      </Link>
    </h1>
    <div>
      <nav>
        <ul style={{ display: "flex", flex: 1 }}>
          {menuLinks.map(link => (
            <li
              key={link.name}
              style={{
                listStyleType: `none`,
                padding: `1rem`,
              }}
            >
              <Link className="linkFormat" to={link.link}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </header>
)

export default Header
