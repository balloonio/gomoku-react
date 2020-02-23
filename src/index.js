import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class Square extends React.Component {
  render() {
    return React.createElement('button',{
      className: "square",
      onClick: () => this.props.onClick()
     }, this.props.value)
  }
}

class Board extends React.Component {
  static ROW_WIDTH = 20;
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
    let sqs = Array(Board.ROW_WIDTH).fill(null);
    sqs = sqs.map((_,i)=> this.renderSquare(row, i));
      return React.createElement('div', {
          className: "board-row"
      },...sqs)
  }

  render() {
    let rows = Array(Board.ROW_WIDTH).fill(null);
    rows = rows.map((_, index) => this.renderRow(index))
    return React.createElement('div', null,
    ...rows
    )
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [ {squares: Array(Board.ROW_WIDTH * Board.ROW_WIDTH).fill(null), click: null} ],
      nextIsX: true,
      currentStep: 0,
    }
  }

  handleSquareClick(i) {
    const current = this.state.history[this.state.currentStep].squares
    const move = this.state.history[this.state.currentStep].click
    const winner = this.determineWinnerWuziqi(current, move)
    if(current[i] !== null || winner ) {
      return  // ignore click on the clicked ones or after anyone already wins
    }
    var new_squares = current.slice();
    new_squares[i] = this.state.nextIsX ? Board.CLICKED_X : Board.CLICKED_O;
    this.setState({
      nextIsX: !this.state.nextIsX,
      history: this.state.history.slice(0,this.state.currentStep+1).concat([{squares: new_squares, click:i}]),
      currentStep: this.state.currentStep + 1,
    })
  }

  determineWinnerWuziqi(squares, click) {
    if( click === null ) {return null;}
    const top = [-1, 0]
    const bot = [1, 0]
    const left = [0, -1]
    const right = [0,1]
    const topRight = [-1,1]
    const topLeft = [-1,-1]
    const botRight = [1,1]
    const botLeft = [1,-1]
    const player = squares[click]
    if((this.countAlongDirection(squares, top, click) + this.countAlongDirection(squares, bot, click) === 4)
      || (this.countAlongDirection(squares, left, click) + this.countAlongDirection(squares, right, click) === 4)
      || (this.countAlongDirection(squares, topRight, click) + this.countAlongDirection(squares, botLeft, click) === 4)
      || (this.countAlongDirection(squares, topLeft, click) + this.countAlongDirection(squares, botRight, click) === 4)){
        return player;
      }
    return null;
  }
  
  countAlongDirection(squares, dir, click) {
    const [dx, dy] = dir;
    const player = squares[click];
    var [x,y] = [Math.floor(click/Board.ROW_WIDTH), click%Board.ROW_WIDTH];
    [x, y] = [dx + x, dy+ y];
    var count = 0;
    while(squares[x * Board.ROW_WIDTH + y] === player) {
      count += 1;
      [x, y] = [dx + x, dy+ y];
    }
    //console.log(x, y, dir, [Math.floor(click/Board.ROW_WIDTH), click%Board.ROW_WIDTH], count,player)
    return count;
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

  handleJumpButtonClick(i) {
    this.setState({
      history: this.state.history,
      nextIsX: i % 2 === 0,
      currentStep: i,
    })
  }

  render() {
    const current = this.state.history[this.state.currentStep].squares
    const move = this.state.history[this.state.currentStep].click
    const winner = this.determineWinnerWuziqi(current, move)
    const status = winner ? `Player ${winner} is the winner!` 
      : `Next player: ${this.state.nextIsX ? Board.CLICKED_X : Board.CLICKED_O}`;

    const moveButtons = this.state.history.map( (_, index) => {
      const desc = index ?
        'Go to move #' + index :
        'Go to game start';
      return (
        <li key={index}>
          <button onClick={() => this.handleJumpButtonClick(index)}>{desc}</button>
        </li>
      )
    })

    return (
      <div className="game">
        <div className="game-board">
          <Board
          squares={current}
          onSquareClick={(i) => this.handleSquareClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol start="0">{moveButtons}</ol>
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
