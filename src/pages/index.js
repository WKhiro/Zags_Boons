import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "./main.css"
import Zagreus from "../images/smug.jpg"

export default function IndexPage({ data }) {
  return (
    <Layout>
      <SEO title="Home" />
      <h1 className="maintext">Welcome to Zag's Boons!</h1>
      <h3 className="maintext">What is this website?</h3>
      <div className="descriptionContainer">
        <p className="description">
          This website is currently being created for the early-access PC game,
          Hades, by SuperGiant Games. The main character, Zagreus, collects a
          variety of upgrades known as "boons" from the Gods upon Olympus during
          his escape from the Underworld. This website is meant to allow for
          easy viewing of boons' upgrades, prerequisites, and effects based on
          rarity level. can be viewed here.
        </p>
        <p className="description">
          All art assets come from Hades or from websites created and owned by
          Supergiant Games, who hold the copyright of Hades. All trademarks and
          registered trademarks present in these art asset files are proprietary
          to Supergiant Games.
        </p>
      </div>
      <img className="zag" src={Zagreus} alt="" />
    </Layout>
  )
}
