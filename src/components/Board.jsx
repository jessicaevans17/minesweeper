import React, { Component } from "react"
import Axios from "axios"
import Cell from "./Cell"

class Board extends Component {
  state = {
    board: [],
    mines: 0,
    difficulty: 0,
    id: ""
  }

  boxClicked = (x, y) => {
    console.log("clicked")
  }

  componentDidMount() {
    Axios({
      method: "post",
      url: "http://minesweeper-api.herokuapp.com/games"
    }).then(res => {
      console.log(res)
      this.setState({
        board: res.data.board,
        mines: res.data.mines,
        difficulty: res.data.difficulty,
        id: res.data.id
      })
    })
  }
  render() {
    return (
      <>
        <h1>Minesweeper!</h1>
        <main>
          <section className="game-play">
            <h2 className="mine-count">Mines = {this.state.mines}</h2>
            <h2 className="flag-count">Flags = 10</h2>
          </section>

          <table className="game-board">
            <tbody>
              {this.state.board.map((col, i) => {
                return (
                  <tr key={i}>
                    {col.map((row, j) => {
                      return (
                        <Cell
                          key={j}
                          display={this.state.board[i][j]}
                          handleClick={() => this.boxClicked(i, j)}
                        />
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
