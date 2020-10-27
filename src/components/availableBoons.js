import React from "react"
import "./boonStyle.css"
import NormalTooltip from "./normalTooltip"
import { v4 as uuidv4 } from "uuid"

export default function AvailableBoons(props) {
  const available = props.available
  return available.map(boonElement => {
    let s = boonElement.name + "-up"
    return (
      <div key={uuidv4()} className="available">
        <img
          data-tip
          data-for={s}
          className="imgSize"
          src={boonElement.iconurl}
          alt=""
        />
        <NormalTooltip id={s} boonData={boonElement} />
        <h4>{boonElement.name}</h4>
      </div>
    )
  })
}
