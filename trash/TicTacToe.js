import * as React from "react";
import { useState, useEffect } from "react";
import Styles from "./Squares.module.css";

export default function App() {
  return <Game />;
}

function Square({ value, onClick }) {
  return (
    <button className={Styles.square} onClick={onClick}>
      {value}
    </button>
  );
}

function Board({ squares, onClick }) {
  const renderSquare = (i) => (
    <Square key={i} value={squares[i]} onClick={() => onClick(i)} />
  );

  const renderSquares = () => {
    const element = [];
    for (let i = 0; i < 3; i++) {
      let line = [];
      for (let j = 0; j < 3; j++) {
        line.push(renderSquare(i * 3 + j));
      }
      element.push(<div key={i}>{line}</div>);
    }
    return element;
  };

  return <div>{renderSquares()}</div>;
}

function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [indexHistory, setIndexHistory] = useState([]);

  // useEffect(() => {
  //   const current = history[history.length - 1];
  //   if (current.length > 1) {
  //     const previous = history[history.length - 2];
  //     for (let i = 0; i < current.squares.length; i++) {
  //       if (current.squares[i] !== previous.squares[i]) {
  //         const xIndex = i % 3;
  //         const yIndex = parseInt(i / 3);
  //         setIndexHistory([...indexHistory, { xIndex, yIndex }]);
  //       }
  //     }
  //   } else if (current.length === 1) {
  //     for (let i = 0; i < current.squares.length; i++) {
  //       if (current.squares[i] !== null) {
  //         const xIndex = i % 3;
  //         const yIndex = parseInt(i / 3);
  //         setIndexHistory([...indexHistory, { xIndex, yIndex }]);
  //       }
  //     }
  //   }
  // }, [history, indexHistory]);

  // useEffect(() => {
  //   const { xIndex, yIndex } = setIndex(history);
  //   setIndexHistory((current) => [...current, { xIndex, yIndex }]);
  // }, [history]);

  function setIndex(history) {
    if (history.length < 2) return { xIndex: null, yIndex: null };
    const current = history[history.length - 1];
    const previous = history[history.length - 2];
    for (let i = 0; i < current.squares.length; i++) {
      if (current.squares[i] !== previous.squares[i]) {
        return { xIndex: i % 3, yIndex: parseInt(i / 3) };
      }
    }
  }

  function handleClick(i) {
    const copyHistory = history.slice(0, stepNumber + 1);
    const current = copyHistory[copyHistory.length - 1];
    const squares = current.squares.slice();

    // 끝났거나, 이미 존재하면 무시
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    // 그림그리기
    squares[i] = xIsNext ? "X" : "O";

    // 그린후 처리
    setHistory([...copyHistory, { squares: squares }]);
    setStepNumber(history.length);
    setXIsNext((current) => !current);
    // const { xIndex, yIndex } = setIndex(history);
    // setIndexHistory((current) => {
    //   console.log("current :>> ", current);
    //   const copy = [...current].slice(0, stepNumber + 1);
    //   copy[stepNumber] = { xIndex, yIndex };
    //   return copy;
    // });
  }

  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  const moves = history.map((step, move) => {
    const desc = move
      ? "Go to move #" +
        move +
        ` ${indexHistory[move]?.xIndex} ${indexHistory[move]?.yIndex}`
      : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status = winner
    ? "Winner:" + winner
    : "Next Player: " + (xIsNext ? "X" : "O");
  console.log("render");
  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// history[~]
// stepNumber랑 동시에 같이 따라감...
// history[0].squares는 전부다 null
// 현재 history에서 복사하기때문에 상관없음..
// history = [{squares:..., xIndex:0, yIndex:}, {squares:...}]
// 마지막으로 누른 인덱스 찾기
// 음... 이전인덱스 -> 현재인덱스비교..

// history[i-1].squares[i] === history[i].squares[i]

// 이거 클릭할때해서 넘기면되지않을까요
// 다른부분 넘기기...

// (useEffect)history :>>  [{…}]
// (setIndex)history :>>  [{…}]
// (useEffect)history :>>  (2) [{…}, {…}]
