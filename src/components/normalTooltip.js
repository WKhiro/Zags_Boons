import React from "react"
import "./boonStyle.css"
import ReactTooltip from "react-tooltip"

export default function NormalTooltip(props) {
  let boonData = props.boonData
  let specialClass = "legendary"
  if (boonData.type === "Legendary" || boonData.type === "Duo") {
    if (boonData.type === "Duo") {
      specialClass = "duo"
    }
    return (
      <ReactTooltip
        className="tool"
        place="top"
        id={props.id}
        type="dark"
        arrowColor="transparent"
      >
        <h4 className={specialClass}>{boonData.name}</h4>
        <h5>{boonData.description}</h5>
        <p>
          <span className={specialClass}>Effect: </span>
          {boonData.effect}
        </p>
      </ReactTooltip>
    )
  } else {
    return (
      <ReactTooltip
        className="tool"
        place="top"
        id={props.id}
        type="dark"
        arrowColor="transparent"
      >
        <h4>{boonData.name}</h4>
        <h5>{boonData.description}</h5>
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
