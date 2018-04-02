import React from 'react';

const ModeModal = (props) => (
        <div className="ModeModal">
            <h1 className="ModeModal__title">One Player or Two Player?</h1>
            <button className="ModeModal--onePlayer" onClick={props.handleOnePlayer}>One Player</button>
            <button className="ModeModal--twoPlayer" onClick={props.handleTwoPlayer}>Two Player</button>
        </div>
);

export default ModeModal;