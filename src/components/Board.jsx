import React, { Component } from "react"
import Axios from "axios"
import Cell from "./Cell"
import GameOver from "./GameOver"
import ResetGame from "./ResetGame"
import ChooseDifficulty from "./ChooseDifficulty"

class Board extends Component {
  state = {
    board: [],
    difficulty: "",
    id: "",
    state: "",
    status: ""
  }

  createGame = async number => {
    const response = await Axios.post(
      "https://minesweeper-api.herokuapp.com/games",
      {
        difficulty: number
      }
    )
    console.log(response)
    this.setState({
      board: response.data.board,
      id: response.data.id,
      difficulty: response.data.difficulty
    })
  }

  showBoard = () => {
    if (this.state.board) {
    }
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
      state: response.data.state
    })
    this.gameOver()
  }

  rightClick = async (x, y) => {
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
    } else if (this.state.state === "won") {
      this.setState({
        status: "Yay! You won!"
      })
    }
  }

  resetGame = () => {
    this.createGame()
    this.setState({
      status: ""
    })
  }

  render() {
    return (
      <>
        <h1 className="title-header">Bomb Sniffer!</h1>
        <ChooseDifficulty
          easyLevel={() => this.createGame(0)}
          mediumLevel={() => this.createGame(1)}
          hardLevel={() => this.createGame(2)}
        />
        <main className="main-board">
          <section className="game-play" />
          <GameOver displayResult={this.state.status} />
          <ResetGame resetClick={this.resetGame} />
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
