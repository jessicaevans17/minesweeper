import React, { Component } from "react"
import Axios from "axios"
class Board extends Component {
  state = {
    board: [
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "]
    ]
  }

  boxClicked = (x, y) => {
    console.log("clicked!")
  }

  componentDidMount() {
    Axios({
      method: "post",
      url: "http://minesweeper-api.herokuapp.com/games"
    }).then(res => {
      this.setState({
        board: res.data.board
      })
    })
  }
  render() {
    return (
      <>
        <h1>Minesweeper!</h1>
        <main>
          <table className="game-board">
            <tbody>
              {this.state.board.map((col, i) => {
                return (
                  <tr key={i}>
                    {col.map((row, j) => {
                      return (
                        <td key={j} onClick={() => this.boxClicked(i, j)}>
                          {(i, j)}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </main>
      </>
    )
  }
}

export default Board
