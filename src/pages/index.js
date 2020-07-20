import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "./testerx.css"

export default function IndexPage({ data }) {
  return (
    <Layout>
      <SEO title="Home" />
      <h1 className="maintext">Welcome to Zag's Boons!</h1>
    </Layout>
  )
}
