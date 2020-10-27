import React, { useState } from "react"
import { graphql } from "gatsby"
// Unique key generator for mapped elements
import { v4 as uuidv4 } from "uuid"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PrerequisiteBoons from "../components/prerequisiteBoons"
import PotentialBoons from "../components/potentialBoons"
import AvailableBoons from "../components/availableBoons"
import GodTitle from "../components/godTitle"
import "./gods.css"

export default function Athena({ data }) {
  const gods = data.dataJson.gods
  // 'Athena' in this case
  const godName = Object.keys(data.dataJson.gods[0])
  // Athena's boon list in this case
  const godData = gods[0][godName]
  let [display, setDisplay] = useState([false])
  // On-off styling for boons on click
  let boonClass = ""
  let available = []
  let potential = []
  let displayingList = []

  const toggleDisplay = index => () => {
    let displayCopy = [...display]
    displayCopy[index] = !displayCopy[index]
    setDisplay(displayCopy)
  }

  const updateLists = boonIndex => {
    // References all of an upgrade boon's data (effects, rarity bonuses)
    let upgradeData = ""
    // Object containing all of an upgrade boon's data EXCEPT its "upgrades" field
    let upgradeObject = {}
    // Name of the boon that was clicked on, or acquired
    const clickedBoon = godData.boons[boonIndex].name
    const clickedBoonUpgrades = godData.boons[boonIndex].upgrades

    // Check if the available boons list contains clickedBoon
    if (available.some(e => e.name === clickedBoon)) {
      // Remove clickedBoon from the list since we have now acquired it
      available.splice(
        available
          .map(boon => {
            return boon.name
          })
          .indexOf(clickedBoon),
        1
      )
    }

    clickedBoonUpgrades.forEach(upgrade => {
      // Find the upgrade's data in the general boon list
      upgradeData = godData.boons.find(boon => boon.name === upgrade.name)

      // Get everything besides the upgrade boon's upgrades array
      upgradeObject = {
        name: upgradeData.name,
        description: upgradeData.description,
        type: upgradeData.type,
        iconurl: upgradeData.iconurl,
        effect: upgradeData.effect,
        rare: upgradeData.rare,
        epic: upgradeData.epic,
        heroic: upgradeData.heroic,
      }

      switch (upgradeData.type) {
        // Upgrades that only required clickedBoon as a prerequisite
        case "Normal":
        case "Artemis":
        case "Poseidon":
        case "Zeus":
          if (!available.some(e => e.name === upgradeData.name)) {
            available.push(upgradeObject)
          }
          break
        // Duo boons will never go into the available boons list for respective God pages
        case "Duo":
          if (!potential.some(e => e.name === upgradeData.name)) {
            // Get the other prerequisites needed for Duo boons
            upgradeObject = Object.assign(
              { other: upgrade.other },
              upgradeObject
            )
            potential.push(upgradeObject)
          }
          break
        case "Legendary":
          // Only branches out of Brilliant Riposte
          available.push(upgradeObject)
          break
        default:
          break
      }
    })
  }

  return (
    <Layout key={uuidv4()}>
      <SEO title="Home" />
      <GodTitle name={godName[0]} src={data.file.childImageSharp.fixed} />
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
          <div className="avail">
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
    file(relativePath: { eq: "athena.png" }) {
      childImageSharp {
        fixed(width: 150, height: 200) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
