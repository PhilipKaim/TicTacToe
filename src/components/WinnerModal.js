import React from 'react';

const WinnerModal = (props) => (
    <div className="winnerModal">
        <h1 className="winnerModal__winner" id="winner">X WINNS!!!</h1>
        <button className="winnerModal__resetBoard" id="resetBoard">Reset Board</button>
    </div>
);

export default WinnerModal;