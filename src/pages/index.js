import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "./testerx.css"

export default function IndexPage({ data }) {
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hades Home Page</h1>
      <Link to="/aphrodite/">Go to page 2</Link> <br />
    </Layout>
  )
}
