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

  renderSquare(row, col) {
    var i = row * Board.ROW_WIDTH + col;
    return React.createElement(Square, {
        index: i,
        value: this.props.squares[i],
        onClick: () => this.props.onSquareClick(i)
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

  render() {
    return React.createElement('div', null,
    this.renderRow(0),
    this.renderRow(1),
    this.renderRow(2)
    )
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [ {squares: Array(9).fill(null)} ],
      nextIsX: true
    }
  }

  handleSquareClick(i) {
    const current = this.state.history[this.state.history.length-1].squares
    if(current[i] !== null || this.determineWinner(current) ) {
      return  // ignore click on the clicked ones or after anyone already wins
    }
    var new_squares = current.slice();
    new_squares[i] = this.state.nextIsX ? Board.CLICKED_X : Board.CLICKED_O;
    this.setState({
      nextIsX: !this.state.nextIsX,
      history: this.state.history.concat([{squares: new_squares}])
    })
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

  render() {
    const current = this.state.history[this.state.history.length-1].squares
    const winner = this.determineWinner(current)
    const status = winner ? `Player ${winner} is the winner!` 
      : `Next player: ${this.state.nextIsX ? Board.CLICKED_X : Board.CLICKED_O}`;

    return (
      <div className="game">
        <div className="game-board">
          <Board
          squares={current}
          onSquareClick={(i) => this.handleSquareClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
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
