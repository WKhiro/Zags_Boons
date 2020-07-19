import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import "./boonStyle.css"

export default function BoonTester(props) {
  // Presentation role removes eslint error
  return (
    <img
      role="presentation"
      className={props.className}
      src={props.iconurl}
      alt={props.name}
      onClick={props.onClick(props.index)}
    ></img>
  )
}
