import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { render } from "react-dom"
import Boon from "../components/boon"
import "./testerx.css"

export default function SecondPage({ data }) {
  const gods = data.dataJson.gods
  const keyVal = {}
  const [display, setDisplay] = useState([false])
  const [boonShow, setBoonShow] = useState([false])
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

  function test(ind) {
    {
      ind.upgrades.map((testName, index) => {
        console.log(testName.name)
        {
          testName.other.forEach(element => console.log(element))
        }
      })
    }
  }

  return (
    <Layout>
      <SEO title="Home" />
      <div class="box">
        <div className="one">
          {data.dataJson.gods.map((godType, index) =>
            godType.aphrodite.boons.map((boonType, index) => {
              return (
                <Boon
                  name="aphrodite"
                  onClick={toggleDisplay(index)}
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
                      console.log(upgradeType.name)
                      if (
                        runningList.some(e =>
                          e.Other.includes(
                            godType.aphrodite.boons[boonNum].name
                          )
                        )
                      ) {
                        console.log("SLICE AND PUSH TO OBTAINED")
                        otherList.push(upgradeType.name)
                        runningList.splice(
                          runningList
                            .map(function (item) {
                              return item.Name
                            })
                            .indexOf(upgradeType.name),
                          1
                        )
                        console.log(runningList)
                        console.log(otherList)
                      }
                    }

                    if (upgradeType.other.length == 0) {
                      otherList.push(upgradeType.name)
                    } else if (
                      !runningList.some(e => e.Name === upgradeType.name) &&
                      !otherList.includes(upgradeType.name)
                    ) {
                      runningList.push({
                        Name: upgradeType.name,
                        Other: upgradeType.other,
                      })
                      console.log("NEW ADDITION")
                      console.log(runningList)
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
                  console.log("RENDERING LOOP")
                  console.log(boonName.name)
                  if (
                    runningList.some(e => e.Name === boonName.name) &&
                    !displayingList.includes(boonName.name)
                  ) {
                    console.log("DISPLAYING" + boonName.name)
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
{display.map((boolVal, boonNum) => {
            if (boolVal) {
              return gods.map((godType, index) =>
                godType.aphrodite.boons[boonNum].upgrades.map(
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
                        godType.aphrodite.boons[boonNum].name
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
        ares {
          name
        }
      }
    }
  }
`
