import React, { Component } from "react"

class ChooseDifficulty extends Component {
  render() {
    return (
      <>
        <section className="difficulty-options">
          <h2>Choose your difficulty.</h2>
          <button className="button easy" onClick={this.props.easyLevel}>
            Easy (10 Mines){" "}
          </button>
          <button className="button medium" onClick={this.props.mediumLevel}>
            Intermediate (40 Mines)
          </button>
          <button className="button hard" onClick={this.props.hardLevel}>
            Expert (99 Mines)
          </button>
          {this.props.showBoard}
        </section>
      </>
    )
  }
}

export default ChooseDifficulty
