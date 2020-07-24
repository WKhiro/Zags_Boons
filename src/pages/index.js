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
      <img className="zag" src={Zagreus} alt="" />
    </Layout>
  )
}
