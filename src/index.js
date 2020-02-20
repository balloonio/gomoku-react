import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function Square(props) {
  return React.createElement('button',{
      className: "square",
      onClick: () => props.onClick()
  }, props.value)
}

class Board extends React.Component {
  static ROW_WIDTH = 3;
  static CLICKED = 'X';
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null)
    }
  }

  handleSquareClick(i) {
    const new_squares = this.state.squares.slice();
    new_squares[i] = Board.CLICKED
    this.setState({squares:new_squares})
  }

  renderSquare(row, col) {
    var i = row * Board.ROW_WIDTH + col;
    return React.createElement(Square, {
        index: i,
        value: this.state.squares[i],
        onClick: () => this.handleSquareClick(i)
    })
  }

  renderRow(row) {
      return React.createElement('div', {
          className: "board-row"
      },
      this.renderSquare(row, 0),
      this.renderSquare(row, 1),
      this.renderSquare(row, 2))
  }

  renderStatus() {
    const status = 'Next player: X';
    return React.createElement('div',{className: "status"},status);
  }

  render() {
    return React.createElement('div', null,
    this.renderStatus(),
    this.renderRow(0),
    this.renderRow(1),
    this.renderRow(2)
    )
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
