// eslint-disable-next-line
import React from 'react'
// eslint-disable-next-line
import ReactDOM from 'react-dom'
import './index.css'

class Square extends React.Component {
  // seems necessary for property method click handler,  2 options
  constructor(props) {
    super(props)
    this.clickHandler1 = this.clickHandler1.bind(this)
    this.state = {
      value: this.props.value
    }
  }
  clickHandler1() {
    alert(this.state.value + ' was clicked')
    this.setState({value: 'X'})
  }
  clickHandler2 = arg => e => {alert(arg + ' was clicked')}
  render() {
    return React.createElement('button',{
        className: "square",
        onClick: this.clickHandler1 // or this.clickHandler2(this.state.value)
    }, this.state.value)

    // return (
    //   <button className="square">
    //     {/* TODO */}
    //   </button>
    // );
  }
}

class Board extends React.Component {
  renderSquare(row, col) {
    return React.createElement(Square, {
        value: row*3 + col
    })
    //return <Square />;
  }

  renderStatus() {
    const status = 'Next player: X';
    return React.createElement('div',{className: "status"},status);
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
    this.renderStatus(),
    this.renderRow(0),
    this.renderRow(1),
    this.renderRow(2)
    )

    // return (
    //   <div>
    //     <div className="status">{status}</div>
    //     <div className="board-row">
    //       {this.renderSquare(0)}
    //       {this.renderSquare(1)}
    //       {this.renderSquare(2)}
    //     </div>
    //     <div className="board-row">
    //       {this.renderSquare(3)}
    //       {this.renderSquare(4)}
    //       {this.renderSquare(5)}
    //     </div>
    //     <div className="board-row">
    //       {this.renderSquare(6)}
    //       {this.renderSquare(7)}
    //       {this.renderSquare(8)}
    //     </div>
    //   </div>
    // );
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
