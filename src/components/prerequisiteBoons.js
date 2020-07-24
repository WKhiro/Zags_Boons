import React from "react"
import "./boonStyle.css"
import NormalTooltip from "./normalTooltip"

export default function PrerequisiteBoons(props) {
  // Presentation role removes eslint error
  var boonData = props.boonData
  return (
    <>
      <img
        data-tip
        data-for={boonData.name}
        role="presentation"
        className={props.className}
        src={boonData.iconurl}
        alt={boonData.name}
        onClick={props.onClick(props.index)}
      ></img>
      <NormalTooltip id={boonData.name} boonData={boonData} />
    </>
  )
}
