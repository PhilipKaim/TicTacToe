import React from 'react';

const Board = (props) => (
    <div className="board">
        <div className="board--0" onClick={() => props.handleMove(0)}>{props.board[0]}</div>
        <div className="board--1" onClick={() => props.handleMove(1)}>{props.board[1]}</div>
        <div className="board--2" onClick={() => props.handleMove(2)}>{props.board[2]}</div>
        <div className="board--3" onClick={() => props.handleMove(3)}>{props.board[3]}</div>
        <div className="board--4" onClick={() => props.handleMove(4)}>{props.board[4]}</div>
        <div className="board--5" onClick={() => props.handleMove(5)}>{props.board[5]}</div>
        <div className="board--6" onClick={() => props.handleMove(6)}>{props.board[6]}</div>
        <div className="board--7" onClick={() => props.handleMove(7)}>{props.board[7]}</div>
        <div className="board--8" onClick={() => props.handleMove(8)}>{props.board[8]}</div>
    </div>
);

export default Board;

