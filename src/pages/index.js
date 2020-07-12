import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { render } from "react-dom"

export default function IndexPage({ data }) {
  const gods = data.dataJson.gods
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
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <div>
          {gods.map((godType, index) => {
            return godType.aphrodite.boons.map((boonType, index2) => {
              return (
                <img
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
        {display[0] && (
          <div>
            {gods.map((godType, index) =>
              godType.aphrodite.boons[0].upgrades.map((upgradeType, index2) => (
                <div>
                  <div>
                    <img src={upgradeType.iconurl} alt="" />
                    <h1>{upgradeType.name}</h1>
                  </div>
                  {upgradeType.other.map(element => (
                    <h3>{element}</h3>
                  ))}
                </div>
              ))
            )}
          </div>
        )}
        {display[1] && (
          <div>
            {gods.map((godType, index) =>
              godType.aphrodite.boons[1].upgrades.map((upgradeType, index2) => (
                <div>
                  <div>
                    <img src={upgradeType.iconurl} alt="" />
                    <h1>{upgradeType.name}</h1>
                  </div>
                  {upgradeType.other.map(element => (
                    <h3>{element}</h3>
                  ))}
                </div>
              ))
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
