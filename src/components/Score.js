import React from 'react';

const Score = (props) => (
    <div className="score">
        <div className="score--x">
            <span className="score__identifyer">X:</span>
            <span id="score--x">{props.score.playerX}</span>
        </div>
        <div className="score--o">
            <span className="score__identifyer">O:</span>
            <span id="score--o">{props.score.playerO}</span>
        </div>
    </div>
);

export default Score;