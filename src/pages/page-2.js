import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { render } from "react-dom"
import Boon from "../components/boon"
import "./testx.css"

export default function SecondPage({ data }) {
  const gods = data.dataJson.gods
  const availableBoons = []
  const [display, setDisplay] = useState([false, false])

  const toggleDisplay = index => () => {
    console.log(index)
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
            godType.aphrodite.boons.map((boonType, index) => (
              <Boon
                name="aphrodite"
                onClick={toggleDisplay(index)}
                boonName={boonType}
              />
            ))
          )}
        </div>
        <div className="two">
          {display.map((boolVal, boonNum) => {
            if (boolVal)
              return (
                <div className="contains">
                  {gods.map((godType, index) =>
                    godType.aphrodite.boons[boonNum].upgrades.map(
                      (upgradeType, index2) => (
                        <div className="bordering">
                          <div className="testin">
                            <img
                              className="testimg"
                              src={upgradeType.iconurl}
                              alt=""
                            />
                            <h3>{upgradeType.name}</h3>
                          </div>
                          {upgradeType.other.map(element => (
                            <h5>{element}</h5>
                          ))}
                        </div>
                      )
                    )
                  )}
                </div>
              )
          })}
        </div>
        <div className="three">
          <div>
            {gods.map((godType, index) => {
              console.log(Object.keys(godType))
              var x = Object.keys(godType)
              return <h1>{x}</h1>
            })}
          </div>
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
