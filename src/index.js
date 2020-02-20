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
  static CLICKED_X = 'X';
  static CLICKED_O = 'O';
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      nextIsX: true,
      winner: null
    }
  }

  determineWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    var winner = null;
    lines.forEach((line) => {
      var [i, j, k] = line
      if (squares[i] === squares[j]
        && squares[j] === squares[k]
        && squares[k] !== null) {
        winner = squares[i];
      }
    })
    return winner;
  }

  handleSquareClick(i) {
    if (this.state.squares[i] !== null ) {
      return  // ignore click
    }
    const new_squares = this.state.squares.slice();
    new_squares[i] = this.state.nextIsX ? Board.CLICKED_X : Board.CLICKED_O;
    // check winner after squares updated
    var new_winner = this.determineWinner(new_squares);
    this.setState({
      squares:new_squares,
      nextIsX: !this.state.nextIsX,
      winner: new_winner
    })
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
    const status = this.state.winner === null
      ? 'Next player: ' + (this.state.nextIsX ? Board.CLICKED_X : Board.CLICKED_O)
      : 'Player ' + this.state.winner + ' is the winner!';
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
