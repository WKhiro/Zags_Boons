import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import "./boonStyle.css"

export default function Boon(props) {
  var buttonClass = "buttonReadjust"
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
          artemis {
            boons {
              name
              iconurl
              upgrades {
                name
              }
            }
          }
          athena {
            boons {
              name
              iconurl
              upgrades {
                name
              }
            }
          }
          demeter {
            boons {
              name
              iconurl
              upgrades {
                name
              }
            }
          }
          dionysus {
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
        if (boonType.name.includes("Flare")) {
          buttonClass = "buttonFlare"
        } else {
          buttonClass = "buttonReadjust"
        }
        // Presentation role removes eslint error
        return (
          <img
            role="presentation"
            className={buttonClass}
            src={boonType.iconurl}
            alt={boonType.name}
            onClick={props.onClick(godType[props.name].boons.indexOf(boonType))}
          ></img>
        )
      })
  )
}
