import React from "react";
import ReactDOM from "react-dom/client";
import { calculateWinner, squareIndexToDesc } from "./library";
import "./index.css";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={"square-" + i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return this.props.squares.map((_, i) => this.renderSquare(i));
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      history: [
        {
          squares: Array(9).fill(null),
          move: null,
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = [...current.squares];
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: [...history, { squares, move: i }],
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(stepNumber) {
    this.setState({
      stepNumber,
      xIsNext: stepNumber % 2 === 0,
    });
  }

  restart() {
    this.setState(this.getInitialState());
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, i) => {
      if (!i) return null;
      const desc = (
        <span>
          <span className="mark">{step.squares[step.move]}</span> in{" "}
          {squareIndexToDesc(step.move)} square
        </span>
      );
      return (
        <li
          key={i}
          className={i === this.state.stepNumber ? "current-step" : undefined}
        >
          <button className="history" onClick={() => this.jumpTo(i)}>
            {desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div>
          <div className="game-info">
            <div>{status}</div>
            {this.state.stepNumber > 0 && (
              <button className="restart" onClick={() => this.restart()}>
                Restart
              </button>
            )}
          </div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
