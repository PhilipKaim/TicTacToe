import React, { Component } from 'react';

export default class PlacerModal extends Component {
    render() {
        return (
            <div className="PlacerModal">
                <h1 className="PlacerModal__title"><span id="PlacerModal--playersPick">Placeholder</span>, X or O</h1>
                <button className="PlacerModal--xButton">X</button>
                <button className="PlacerModal--oButton">O</button>
            </div>
        );
    }
}