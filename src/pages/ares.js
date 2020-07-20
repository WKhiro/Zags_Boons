import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Boon from "../components/boon"
import BoonTester from "../components/boonTester"
import PotentialBoons from "../components/potentialBoons"
import AvailableBoons from "../components/availableBoons"
import "./testerx.css"

export default function Ares({ data }) {
  const gods = data.dataJson.gods
  // 'Ares' in this case
  const godName = Object.keys(data.dataJson.gods[0])
  // Ares' boon list in this case
  const godData = gods[0][godName]
  var [display, setDisplay] = useState([false])
  var available = []
  var potential = []
  var displayingList = []

  const toggleDisplay = index => () => {
    let displayCopy = [...display]
    displayCopy[index] = !displayCopy[index]
    setDisplay(displayCopy)
  }

  const updateLists = boonIndex => {
    godData.boons[boonIndex].upgrades.forEach(upgrade => {
      const clickedBoon = godData.boons[boonIndex].name

      // Check if any potential upgrades become avaliable with the addition of the clicked boon
      if (
        potential.some(
          e => e.Name === upgrade.name && e.Other.includes(clickedBoon)
        )
      ) {
        // Add unlocked upgrade to the available list, and remove from potential list
        available.push({
          Name: upgrade.name,
          Iconurl: upgrade.iconurl,
        })
        potential.splice(
          potential
            .map(boon => {
              return boon.Name
            })
            .indexOf(upgrade.name),
          1
        )
      }

      // 'Vengeful Mood' boon double prerequisite check
      if (upgrade.other2) {
        // If 'Vengeful Mood' is in the potential list and the clicked boon is a prerequisite
        if (
          upgrade.other2.includes(clickedBoon) &&
          potential.some(boon => boon.Name === upgrade.name)
        ) {
          // Remove one of the prerequisites
          potential.find(boon => boon.Name === upgrade.name).Other2 = []
        }
      }

      // Check if the clicked boon is in the available list
      if (available.some(e => e.Name === clickedBoon)) {
        // Remove it from the available list because we now have it (clicked on it)
        available.splice(
          available
            .map(boon => {
              return boon.Name
            })
            .indexOf(clickedBoon),
          1
        )
      }

      // Add upgrades with no other prerequisite boons to the available list if it's not already there
      if (
        upgrade.other.length === 0 &&
        !available.some(e => e.Name === upgrade.name)
      ) {
        available.push({
          Name: upgrade.name,
          Iconurl: upgrade.iconurl,
        })
      }

      // The upgrade isn't in either list; add it to the potential list
      if (
        !potential.some(e => e.Name === upgrade.name) &&
        !available.some(e => e.Name === upgrade.name)
      ) {
        // 'Vengeful Mood' boon clause
        if (upgrade.other2) {
          if (!upgrade.other2.includes(clickedBoon)) {
            potential.push({
              Name: upgrade.name,
              Other: upgrade.other,
              Other2: upgrade.other2,
              Iconurl: upgrade.iconurl,
            })
          }
        } else {
          potential.push({
            Name: upgrade.name,
            Other: upgrade.other,
            Other2: [],
            Iconurl: upgrade.iconurl,
          })
        }
      }
    })
  }

  return (
    <Layout>
      <SEO title="Home" />
      <div class="box">
        <div className="one">
          <h2>Prerequisite Boons</h2>
          {data.dataJson.gods.map((godType, index) =>
            godType[godName].boons
              .filter(boonType => boonType.upgrades.length !== 0)
              .map((boonType, index) => {
                var classButton = display[
                  godType[godName].boons.indexOf(boonType)
                ]
                  ? "buttonFlare"
                  : "buttonReadjust"
                return (
                  <BoonTester
                    name={boonType.name}
                    iconurl={boonType.iconurl}
                    index={godType[godName].boons.indexOf(boonType)}
                    className={classButton}
                    onClick={toggleDisplay}
                  />
                )
              })
          )}
        </div>
        <div className="two">
          <h2>Potential Upgrades</h2>
          {/* Determine what to display based on clicked boons before rendering */}
          {display.forEach((boolVal, boonIndex) => {
            if (boolVal) {
              updateLists(boonIndex)
            }
          })}
          {display
            .filter(boolVal => boolVal)
            .map(boolVal => {
              return (
                <PotentialBoons
                  potential={potential}
                  displayingList={displayingList}
                />
              )
            })}
        </div>
        <div className="three">
          <h2>Available Upgrades</h2>
          <AvailableBoons available={available} />
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    dataJson {
      gods {
        ares {
          boons {
            name
            iconurl
            upgrades {
              name
              iconurl
              type
              other
              other2
            }
          }
        }
      }
    }
  }
`
