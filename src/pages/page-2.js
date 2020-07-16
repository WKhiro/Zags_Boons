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
                        otherList.push({
                          Name: upgradeType.name,
                          Iconurl: upgradeType.iconurl,
                        })
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
                    if (
                      otherList.some(
                        e => e.Name === godType.aphrodite.boons[boonNum].name
                      )
                    ) {
                      // Get rid of avaliable boons if we click on them
                      otherList.splice(
                        otherList
                          .map(function (item) {
                            return item.Name
                          })
                          .indexOf(godType.aphrodite.boons[boonNum].name),
                        1
                      )
                    }
                    if (
                      upgradeType.other.length === 0 &&
                      !otherList.some(e => e.Name === upgradeType.name)
                    ) {
                      otherList.push({
                        Name: upgradeType.name,
                        Iconurl: upgradeType.iconurl,
                      })
                    } else if (
                      !runningList.some(e => e.Name === upgradeType.name) &&
                      !otherList.some(e => e.Name === upgradeType.name)
                    ) {
                      runningList.push({
                        Name: upgradeType.name,
                        Other: upgradeType.other,
                        Iconurl: upgradeType.iconurl,
                      })
                    }
                  }
                )
              )
            }
          })}
          {display.map((boolVal, boonNum) => {
            if (boolVal) {
              return runningList.map(element => {
                if (!displayingList.includes(element.Name)) {
                  displayingList.push(element.Name)
                  return (
                    <div className="bordering">
                      <div className="testin">
                        <img className="testimg" src={element.Iconurl} alt="" />
                        <h3>{element.Name}</h3>
                      </div>
                      {element.Other.map(reqs => {
                        return <h5>{reqs}</h5>
                      })}
                    </div>
                  )
                }
              })
            }
          })}
        </div>
        <div className="three">
          {otherList.map(boonElement => {
            console.log(otherList)
            return (
              <div className="bordering">
                <div className="testin">
                  <img className="testimg" src={boonElement.Iconurl} alt="" />
                  <h3>{boonElement.Name}</h3>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

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
