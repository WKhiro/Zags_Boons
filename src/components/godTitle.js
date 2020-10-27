import React from "react"
import "./boonStyle.css"
import Img from "gatsby-image"

export default function GodTitle(props) {
  let titleClass = "titleFormat"
  switch (props.name) {
    case "aphrodite":
      titleClass = "aphroditeTitle"
      break
    case "ares":
      titleClass = "aresTitle"
      break
    case "artemis":
      titleClass = "artemisTitle"
      break
    case "athena":
      titleClass = "athenaTitle"
      break
    case "demeter":
      titleClass = "demeterTitle"
      break
    case "dionysus":
      titleClass = "dionysusTitle"
      break
    case "poseidon":
      titleClass = "poseidonTitle"
      break
    case "zeus":
      titleClass = "zeusTitle"
      break
    default:
      titleClass = "titleFormat"
      break
  }
  // Eager loading prevents image flicker
  return (
    <div className="titleContainer">
      <h1 className={titleClass}>{props.name}</h1>
      <Img className="godTester" fixed={props.src} loading="eager" />
    </div>
  )
}
