// eslint-disable-next-line
import React from 'react'
// eslint-disable-next-line
import ReactDOM from 'react-dom'
import './index.css'

class Square extends React.Component {
  render() {
    return React.createElement('button',{
        className: "square"
    })
    
    // return (
    //   <button className="square">
    //     {/* TODO */}
    //   </button>
    // );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return React.createElement(Square)
    //return <Square />;
  }

  renderStatus() {
    const status = 'Next player: X';
    return React.createElement('div',{className: "status"},status);
  }

  renderRow() {
      return React.createElement('div', {
          className: "board-row"
      },
      this.renderSquare(),
      this.renderSquare(),
      this.renderSquare())
  }

  render() {
    return React.createElement('div', null,
    this.renderStatus(),
    this.renderRow(),
    this.renderRow(),
    this.renderRow()
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
