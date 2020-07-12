import React, { Component } from "react"
import { Link } from "gatsby"
import Table from "../components/Table"
import Form from "../components/Form"
import "./main.css"
import Layout from "../components/layout"
import SEO from "../components/seo"

class SecondPage extends Component {
  state = {
    characters: [],
  }

  removeCharacter = index => {
    const { characters } = this.state

    this.setState({
      characters: characters.filter((character, i) => {
        return i !== index
      }),
    })
  }

  handleSubmit = character => {
    this.setState({ characters: [...this.state.characters, character] })
  }

  render() {
    const { characters } = this.state

    return (
      <div className="container">
        <h1>React Tutorial</h1>
        <p>Add a character with a name and a job to the table.</p>
        <Table
          characterData={characters}
          removeCharacter={this.removeCharacter}
        />
        <h3>Add New</h3>
        <Form handleSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default SecondPage
