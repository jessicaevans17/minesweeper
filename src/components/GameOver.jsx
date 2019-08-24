import React, { Component } from "react"

class GameOver extends Component {
  render() {
    return (
      <>
        <h2 className="game-over">{this.props.displayResult}</h2>
      </>
    )
  }
}

export default GameOver
