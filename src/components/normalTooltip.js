import React from "react"
import "./boonStyle.css"
import ReactTooltip from "react-tooltip"

export default function NormalTooltip(props) {
  var boonData = props.boonData
  var specialClass = "legendary"
  if (boonData.type === "Legendary" || boonData.type === "Duo") {
    if (boonData.type === "Duo") {
      specialClass = "duo"
    }
    return (
      <ReactTooltip className="tool" place="top" id={props.id} type="dark">
        <h5>{boonData.name}</h5>
        <p>{boonData.description}</p>
        <p>
          <span className={specialClass}>Effect: </span>
          {boonData.effect}
        </p>
      </ReactTooltip>
    )
  } else {
    return (
      <ReactTooltip className="tool" place="top" id={props.id} type="dark">
        <h5>{boonData.name}</h5>
        <p>{boonData.description}</p>
        <p>
          <span className="common">Common: </span>
          {boonData.effect}
        </p>
        <p>
          <span className="rare">Rare: </span>
          {boonData.rare}
        </p>
        <p>
          <span className="epic">Epic: </span>
          {boonData.epic}
        </p>
        <p>
          <span className="heroic">Heroic: </span>
          {boonData.heroic}
        </p>
      </ReactTooltip>
    )
  }
}
