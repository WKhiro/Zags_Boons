import React, { useState } from "react"
import { graphql } from "gatsby"
// Unique key generator for mapped elements
import { v4 as uuidv4 } from "uuid"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PrerequisiteBoons from "../components/prerequisiteBoons"
import PotentialBoons from "../components/potentialBoons"
import AvailableBoons from "../components/availableBoons"
import "./gods.css"

export default function Athena({ data }) {
  const gods = data.dataJson.gods
  // 'Athena' in this case
  const godName = Object.keys(data.dataJson.gods[0])
  // Athena's boon list in this case
  const godData = gods[0][godName]
  var [display, setDisplay] = useState([false])
  // On-off styling for boons on click
  var boonClass = ""
  var available = []
  var potential = []
  var displayingList = []

  const toggleDisplay = index => () => {
    let displayCopy = [...display]
    displayCopy[index] = !displayCopy[index]
    setDisplay(displayCopy)
  }

  const updateLists = boonIndex => {
    // Used to reference the upgrade's data (effects, rarity bonuses)
    let upgradeData = ""
    // Name of the boon that was just clicked on
    const clickedBoon = godData.boons[boonIndex].name

    godData.boons[boonIndex].upgrades.forEach(upgrade => {
      // Find the upgrade's data in the general boon list
      upgradeData = godData.boons.find(boon => boon.name === upgrade.name)

      // Check if any potential upgrades become avaliable with the addition of the clicked boon
      if (
        potential.some(
          e => e.name === upgrade.name && e.other.includes(clickedBoon)
        )
      ) {
        // Add unlocked upgrade to the available list, and remove from potential list
        available.push({
          name: upgradeData.name,
          description: upgradeData.description,
          type: upgradeData.type,
          iconurl: upgradeData.iconurl,
          effect: upgradeData.effect,
          rare: upgradeData.rare,
          epic: upgradeData.epic,
          heroic: upgradeData.heroic,
        })
        potential.splice(
          potential
            .map(boon => {
              return boon.name
            })
            .indexOf(upgradeData.name),
          1
        )
      }

      // Check if the clicked boon is in the available list
      if (available.some(e => e.name === clickedBoon)) {
        // Remove it from the available list because we now have it (clicked on it)
        available.splice(
          available
            .map(boon => {
              return boon.name
            })
            .indexOf(clickedBoon),
          1
        )
      }

      // Add upgrades with no other prerequisite boons to the available list if it's not already there
      if (
        upgrade.other.length === 0 &&
        !available.some(e => e.name === upgradeData.name)
      ) {
        available.push({
          name: upgradeData.name,
          description: upgradeData.description,
          type: upgradeData.type,
          iconurl: upgradeData.iconurl,
          effect: upgradeData.effect,
          rare: upgradeData.rare,
          epic: upgradeData.epic,
          heroic: upgradeData.heroic,
        })
      }

      // The upgrade isn't in either list; add it to the potential list
      if (
        !potential.some(e => e.name === upgradeData.name) &&
        !available.some(e => e.name === upgradeData.name)
      ) {
        potential.push({
          name: upgradeData.name,
          description: upgradeData.description,
          type: upgradeData.type,
          iconurl: upgradeData.iconurl,
          effect: upgradeData.effect,
          rare: upgradeData.rare,
          epic: upgradeData.epic,
          heroic: upgradeData.heroic,
          other: upgrade.other,
        })
      }
    })
  }

  return (
    <Layout key={uuidv4()}>
      <SEO title="Home" />
      <div className="box">
        <div className="tx1">
          <div>
            <h2>Prerequisite Boons</h2>
            {data.dataJson.gods.map((godType, index) =>
              godType[godName].boons
                .filter(boonType => boonType.upgrades.length !== 0)
                .map((boonType, index) => {
                  boonClass = display[godType[godName].boons.indexOf(boonType)]
                    ? "boonOn"
                    : "boonOff"
                  return (
                    <PrerequisiteBoons
                      key={uuidv4()}
                      boonData={boonType}
                      index={godType[godName].boons.indexOf(boonType)}
                      className={boonClass}
                      onClick={toggleDisplay}
                    />
                  )
                })
            )}
          </div>
          <div>
            <h2>Available Upgrades</h2>
            <AvailableBoons available={available} />
          </div>
        </div>
        <div className="tx2">
          <h2>Potential Upgrades</h2>
          <div className="box2">
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
                    key={uuidv4()}
                    potential={potential}
                    displayingList={displayingList}
                  />
                )
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
        athena {
          boons {
            name
            description
            type
            effect
            rare
            epic
            heroic
            iconurl
            upgrades {
              name
              type
              iconurl
              other
            }
          }
        }
      }
    }
  }
`
