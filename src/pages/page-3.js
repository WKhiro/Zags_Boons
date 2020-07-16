import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { render } from "react-dom"
import Boon from "../components/boon"
import "./testerx.css"

export default function ThirdPage({ data }) {
  const [display, setDisplay] = useState([false])

  const toggleDisplay = index => () => {
    //console.log(index)
    console.log("CLICKED!")
    let displayCopy = [...display]
    displayCopy[index] = !displayCopy[index]
    setDisplay(displayCopy)
  }

  return (
    <Layout>
      <SEO title="Home" />
      <div class="box">
        <div className="one">
          {data.dataJson.gods.map((godType, index) =>
            godType.ares.boons.map((boonType, index) => {
              if (boonType.upgrades.length != 0) {
                return (
                  <Boon
                    name="ares"
                    onClick={toggleDisplay(index)}
                    boonName={boonType}
                  />
                )
              }
            })
          )}
        </div>
        <div className="two"></div>
        <div className="three"></div>
      </div>
    </Layout>
  )
}

/*
{display.map((boolVal, boonNum) => {
            if (boolVal) {
              return gods.map((godType, index) =>
                godType.ares.boons[boonNum].upgrades.map(
                  (upgradeType, index2) => {
                    if (!keyVal.hasOwnProperty(upgradeType.name)) {
                      keyVal[upgradeType.name] = upgradeType.other
                      if (upgradeType.other.length == 0) {
                        otherList.push(upgradeType.name)
                      } else {
                        return (
                          <div className="bordering">
                            <div className="testin">
                              <img
                                className="testimg"
                                src={upgradeType.iconurl}
                                alt=""
                              />
                              <h3>{upgradeType.name}</h3>
                            </div>
                            {upgradeType.other.map(element => {
                              return <h5>{element}</h5>
                            })}
                          </div>
                        )
                      }
                    } else if (
                      keyVal[upgradeType.name].includes(
                        godType.ares.boons[boonNum].name
                      )
                    ) {
                      otherList.push(upgradeType.name)
                    }
                    //if statement
                  }
                )
              )
            }
          })}
*/

/*
        <div className="three">
          <div>
            {gods.map((godType, index) => {
              //console.log(Object.keys(godType))
              var x = Object.keys(godType)
              return <h1>{x}</h1>
            })}
          </div>
        </div>
        */

export const query = graphql`
  query {
    dataJson {
      gods {
        ares {
          boons {
            name
            iconurl
            upgrades {
              iconurl
              name
              other
              type
            }
          }
          name
        }
      }
    }
  }
`
