import React, { Component } from "react"
import Axios from "axios"
import Cell from "./Cell"

class Board extends Component {
  state = {
    board: [],
    mines: 0,
    difficulty: 0,
    id: "",
    state: "",
    status: ""
  }

  leftClick = async (x, y) => {
    const response = await Axios.post(
      `https://minesweeper-api.herokuapp.com/games/${this.state.id}/check`,
      {
        row: x,
        col: y
      }
    )
    console.log(response)
    this.setState({
      board: response.data.board,
      id: response.data.id,
      mines: response.data.mines,
      state: response.data.state
    })
    this.gameOver()
  }

  rightClick = async (x, y, event) => {
    const response = await Axios.post(
      `https://minesweeper-api.herokuapp.com/games/${this.state.id}/flag`,
      {
        row: x,
        col: y
      }
    )
    this.setState({
      board: response.data.board,
      id: response.data.id,
      state: response.data.state
    })
    console.log(response)
  }

  gameOver = async () => {
    if (this.state.state === "lost") {
      this.setState({
        status: "Oh no, you lose!! Try again!"
      }) 
    } else if ()
  }

  async componentDidMount() {
    const response = await Axios.post(
      "https://minesweeper-api.herokuapp.com/games"
    )
    console.log(response)
    this.setState({
      board: response.data.board,
      mines: response.data.mines,
      id: response.data.id
    })
  }

  render() {
    return (
      <>
        <h1>Minesweeper!</h1>
        <main>
          <section className="game-play" />
          <section className="gameOver">{this.state.status}</section>
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
                          handleLeftClick={() => this.leftClick(i, j)}
                          handleRightClick={() => this.rightClick(i, j)}
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
