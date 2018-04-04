import React from 'react';

const WinnerModal = (props) => (
    <div className="winnerModal">
        <h1 className="winnerModal__winner" id="winner">{props.winner} Wins!!!</h1>
        <button className="winnerModal__resetBoard" id="resetBoard" onClick={props.handleResetBoard}>Reset Board</button>
    </div>
);

export default WinnerModal;