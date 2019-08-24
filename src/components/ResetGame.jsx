import React, { Component } from "react"

class ResetGame extends Component {
  render() {
    return (
      <button className="reset-game" onClick={this.props.resetClick}>
        Play Again
      </button>
    )
  }
}

export default ResetGame
