import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "./main.css"
import Zagreus from "../images/welcome.jpg"

export default function IndexPage({ data }) {
  return (
    <Layout>
      <SEO title="Home" />
      <div className="parent">
        <a href="https://store.steampowered.com/app/1145360/Hades/">
          <img className="zag" src={Zagreus} alt="" />
        </a>
        <div className="descriptionContainer">
          <h1 className="maintext">What is this website?</h1>
          <p className="description">
            This website was created for the (then) early-access PC game, Hades,
            by Supergiant Games. The main character, Zagreus, collects a variety
            of upgrades known as "boons" from the Gods/Goddesses upon Olympus
            during his escape from the Underworld. Since there are so many boons
            that Zagreus can obtain, I wanted a way to allow players to easily
            view boon upgrades, prerequisites, and effects based on rarity
            level.
          </p>
          <p className="description">
            Unfortunately, as of the official release of the game, the Codex now
            features a similar functionality in the Boon List.
          </p>
          <p className="description">
            All art assets come from Hades or from websites created and owned by
            Supergiant Games, who hold the copyright of Hades. All trademarks
            and registered trademarks present in these art asset files are
            proprietary to Supergiant Games.
          </p>
        </div>
      </div>
    </Layout>
  )
}
