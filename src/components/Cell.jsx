import React, { Component } from "react"

export class Cell extends Component {
  render() {
    return <td onClick={this.props.handleClick}>{this.props.display}</td>
  }
}

export default Cell
