import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Boon from "../components/boon"
import "./testerx.css"

export default function SecondPage({ data }) {
  const gods = data.dataJson.gods
  const godName = Object.keys(data.dataJson.gods[0])
  const aphroditeData = gods[0][godName] //aphrodite's data (boons)
  const [display, setDisplay] = useState([false])
  const available = []
  const potential = []
  const displayingList = []

  const toggleDisplay = index => () => {
    //console.log(index)
    console.log("CLICKED!")
    let displayCopy = [...display]
    displayCopy[index] = !displayCopy[index]
    setDisplay(displayCopy)
  }

  const updateLists = boonIndex => {
    aphroditeData.boons[boonIndex].upgrades.forEach(upgrade => {
      const clickedBoon = aphroditeData.boons[boonIndex].name

      // Check if potential boons are available with the clicked boon, and removes them from the potential list + add to available list
      if (
        potential.some(
          e => e.Name === upgrade.name && e.Other.includes(clickedBoon)
        )
      ) {
        available.push({
          Name: upgrade.name,
          Iconurl: upgrade.iconurl,
        })
        potential.splice(
          potential
            .map(function (boon) {
              return boon.Name
            })
            .indexOf(upgrade.name),
          1
        )
      }

      // Check if the clicked boon is available; if it is, remove it because we click on it aka we have it already
      if (available.some(e => e.Name === clickedBoon)) {
        available.splice(
          available
            .map(function (boon) {
              return boon.Name
            })
            .indexOf(clickedBoon),
          1
        )
      }

      // If the upgrade can be obtained already (no other prereqs) and it's not already showing as available
      if (
        upgrade.other.length === 0 &&
        !available.some(e => e.Name === upgrade.name)
      ) {
        available.push({
          Name: upgrade.name,
          Iconurl: upgrade.iconurl,
        })
      }
      // the upgrade isn't in either list
      else if (
        !potential.some(e => e.Name === upgrade.name) &&
        !available.some(e => e.Name === upgrade.name)
      ) {
        console.log(upgrade.name)
        potential.push({
          Name: upgrade.name,
          Other: upgrade.other,
          Iconurl: upgrade.iconurl,
        })
      }
    })
  }

  return (
    <Layout>
      <SEO title="Home" />
      <div class="box">
        <div className="one">
          <Boon name={godName} onClick={toggleDisplay} />
        </div>
        <div className="two">
          {display.map((boolVal, boonIndex) => {
            if (boolVal) {
              updateLists(boonIndex)
            }
          })}
          {display.map((boolVal, boonIndex) => {
            if (boolVal) {
              return potential.map(element => {
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
          {available.map(boonElement => {
            console.log(available)
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
