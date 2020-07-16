import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Boon from "../components/boon"
import "./testerx.css"

export default function SecondPage({ data }) {
  const gods = data.dataJson.gods
  const [display, setDisplay] = useState([false])
  const otherList = []
  const runningList = []
  const displayingList = []

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
          {gods.map((godType, index) =>
            godType.aphrodite.boons
              .filter(boonType => boonType.upgrades.length !== 0)
              .map((boonType, index) => {
                return (
                  <Boon
                    name="aphrodite"
                    onClick={toggleDisplay(
                      godType.aphrodite.boons.indexOf(boonType)
                    )}
                    boonName={boonType}
                  />
                )
              })
          )}
        </div>
        <div className="two">
          {display.map((boolVal, boonNum) => {
            if (boolVal) {
              gods.map((godType, index) =>
                godType.aphrodite.boons[boonNum].upgrades.map(
                  (upgradeType, index2) => {
                    if (runningList.some(e => e.Name === upgradeType.name)) {
                      if (
                        runningList.some(e =>
                          e.Other.includes(
                            godType.aphrodite.boons[boonNum].name
                          )
                        )
                      ) {
                        otherList.push(upgradeType.name)
                        runningList.splice(
                          runningList
                            .map(function (item) {
                              return item.Name
                            })
                            .indexOf(upgradeType.name),
                          1
                        )
                      }
                    }

                    if (upgradeType.other.length === 0) {
                      otherList.push(upgradeType.name)
                    } else if (
                      !runningList.some(e => e.Name === upgradeType.name) &&
                      !otherList.includes(upgradeType.name)
                    ) {
                      runningList.push({
                        Name: upgradeType.name,
                        Other: upgradeType.other,
                      })
                    }
                  }
                )
              )
            }
          })}
          {display.map((boolVal, boonNum) => {
            if (boolVal) {
              return gods.map((godType, index) =>
                godType.aphrodite.boons.map((boonName, index2) => {
                  if (
                    runningList.some(e => e.Name === boonName.name) &&
                    !displayingList.includes(boonName.name)
                  ) {
                    displayingList.push(boonName.name)
                    return (
                      <div className="bordering">
                        <div className="testin">
                          <img
                            className="testimg"
                            src={boonName.iconurl}
                            alt=""
                          />
                          <h3>{boonName.name}</h3>
                        </div>
                        {runningList.map(element => {
                          if (element.Name === boonName.name) {
                            return element.Other.map(reqs => {
                              return <h5>{reqs}</h5>
                            })
                          }
                        })}
                      </div>
                    )
                  }
                })
              )
            }
          })}
        </div>
        <div className="three">
          {gods.map((godType, index) =>
            godType.aphrodite.boons.map((boonName, index2) => {
              if (otherList.includes(boonName.name)) {
                return (
                  <div className="bordering">
                    <div className="testin">
                      <img className="testimg" src={boonName.iconurl} alt="" />
                      <h3>{boonName.name}</h3>
                    </div>
                  </div>
                )
              }
            })
          )}
        </div>
      </div>
    </Layout>
  )
}

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
        aphrodite {
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
