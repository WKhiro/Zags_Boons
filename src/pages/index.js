import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { render } from "react-dom"
import "./testx.css"

export default function IndexPage({ data }) {
  const gods = data.dataJson.gods
  const availableBoons = []
  const [display, setDisplay] = useState([false, false])

  const toggleDisplay = index => () => {
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
      <div className="box">
        <div>
          {gods.map((godType, index) => {
            return godType.aphrodite.boons.map((boonType, index2) => {
              return (
                <img
                  className="buttonReadjust"
                  src={boonType.iconurl}
                  alt=""
                  onClick={
                    toggleDisplay(index2) //test(boonType)
                  }
                ></img>
              )
            })
          })}
        </div>
      </div>
      <div style={{ display: `flex` }}>
        {availableBoons}
        {display[0] &&
          availableBoons.push(
            <div className="contains">
              {gods.map((godType, index) =>
                godType.aphrodite.boons[0].upgrades.map(
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
          )}
        {display[1] &&
          availableBoons.push(
            <div>
              {gods.map((godType, index) =>
                godType.aphrodite.boons[1].upgrades.map(
                  (upgradeType, index2) => (
                    <div>
                      <div>
                        <img src={upgradeType.iconurl} alt="" />
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
          )}
      </div>
      <Link to="/page-2/">Go to page 2</Link> <br />
      <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
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
      }
    }
  }
`
