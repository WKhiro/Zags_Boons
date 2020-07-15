import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import "./boonStyle.css"

export default function Boon(props) {
  const data = useStaticQuery(graphql`
    query {
      dataJson {
        gods {
          aphrodite {
            boons {
              name
              iconurl
              upgrades {
                iconurl
                name
                other
              }
            }
            name
          }
          ares {
            name
            boons {
              name
              iconurl
              upgrades {
                name
                other
              }
            }
          }
        }
      }
    }
  `)
  return (
    <img
      className="buttonReadjust"
      src={props.boonName.iconurl}
      alt=""
      onClick={props.onClick}
    ></img>
  )
}
