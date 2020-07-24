import React from "react"
import "./boonStyle.css"
import NormalTooltip from "./normalTooltip"
import { v4 as uuidv4 } from "uuid"

export default function PotentialBoons(props) {
  const potential = props.potential
  const displayingList = props.displayingList

  return potential.map(element => {
    if (!displayingList.includes(element.name)) {
      displayingList.push(element.name)

      // Check if the upgrade requires two more prerequisites instead of just one
      if (element.other2) {
        if (element.other2.length !== 0) {
          return (
            <div key={uuidv4()} className="too">
              <img
                data-tip
                data-for={element.name}
                className="testimg"
                src={element.iconurl}
                alt=""
              />
              <NormalTooltip id={element.name} boonData={element} />
              <h4 className="spaceBoon">{element.name}</h4>
              {element.other.map(reqs => {
                return <h5>+ {reqs}</h5>
              })}
              IN ADDITION
              {element.other2.map(reqs2 => {
                return <h5>+ {reqs2}</h5>
              })}
            </div>
          )
        } else {
          return (
            <div key={uuidv4()} className="too">
              <img
                data-tip
                data-for={element.name}
                className="testimg"
                src={element.iconurl}
                alt=""
              />
              <NormalTooltip id={element.name} boonData={element} />
              <h4 className="spaceBoon">{element.name}</h4>
              {element.other.map(reqs => {
                return <h5>+ {reqs}</h5>
              })}
            </div>
          )
        }
      } else {
        return (
          <div key={uuidv4()} className="too">
            <img
              data-tip
              data-for={element.name}
              className="testimg"
              src={element.iconurl}
              alt=""
            />
            <NormalTooltip id={element.name} boonData={element} />
            <h4>{element.name}</h4>
            {element.other.map(reqs => {
              return <h5 key={uuidv4()}>+ {reqs}</h5>
            })}
          </div>
        )
      }
    } else {
      return null
    }
  })
}
