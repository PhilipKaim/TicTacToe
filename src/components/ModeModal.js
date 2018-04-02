import React, { Component } from 'react';

export default class ModeModal extends Component {
    render() {
        return (
            <div className="ModeModal">
                <h1 className="ModeModal__title">One Player or Two Player?</h1>
                <button className="ModeModal--onePlayer">One Player</button>
                <button className="ModeModal--twoPlayer">Two Player</button>
            </div>
        );
    }
}