import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import "./boonStyle.css"
import ReactTooltip from "react-tooltip"

export default function BoonTester(props) {
  // Presentation role removes eslint error
  return (
    <>
      <img
        data-tip
        data-for={props.name}
        role="presentation"
        className={props.className}
        src={props.iconurl}
        alt={props.name}
        onClick={props.onClick(props.index)}
      ></img>
      <ReactTooltip className="tool" place="top" id={props.name} type="dark">
        <h4>{props.name}</h4>
        <p>{props.description}</p>
        <p>
          <span className="common">Common: </span>
          {props.common}
        </p>
        <p>
          <span className="rare">Rare: </span>
          {props.rare}
        </p>
        <p>
          <span className="epic">Epic: </span>
          {props.epic}
        </p>
        <p>
          <span className="heroic">Heroic: </span>
          {props.heroic}
        </p>
      </ReactTooltip>
    </>
  )
}
