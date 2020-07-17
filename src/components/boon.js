import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import "./boonStyle.css"

export default function Boon(props) {
  //remove boon name from query if I don't add titles
  const data = useStaticQuery(graphql`
    query {
      dataJson {
        gods {
          aphrodite {
            boons {
              name
              iconurl
              upgrades {
                name
              }
            }
          }
          ares {
            boons {
              name
              iconurl
              upgrades {
                name
              }
            }
          }
        }
      }
    }
  `)
  return data.dataJson.gods.map((godType, index) =>
    godType[props.name].boons
      .filter(boonType => boonType.upgrades.length !== 0)
      .map((boonType, index) => {
        return (
          <img
            className="buttonReadjust"
            src={boonType.iconurl}
            alt=""
            onClick={props.onClick(godType[props.name].boons.indexOf(boonType))}
          ></img>
        )
      })
  )
}
