import React from "react"
import "../pages/testerx.css"

export default function AvailableBoons(props) {
  const available = props.available
  return available.map(boonElement => {
    return (
      <div className="bordering">
        <div className="testin">
          <img className="testimg" src={boonElement.Iconurl} alt="" />
          <h3>{boonElement.Name}</h3>
        </div>
      </div>
    )
  })
}
