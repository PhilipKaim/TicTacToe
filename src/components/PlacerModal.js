import React, { Component } from 'react';

export default class Placeholder extends Component {

    state = {
        player: undefined
    }

    componentDidMount() {

        if (this.props.mode.onePlayer === true) {
            console.log('it one player mode');
            
        } else {
            const randomPlayer = Math.floor(Math.random() * 2) + 1;

            if (randomPlayer === 1) {
                this.setState(() => ({
                    player: 'Player One, '
                }));
            } else {
                this.setState(() => ({
                    player: 'Player Two, '
                }));
            }
        }
    }

    render() {
        return (
            <div className="PlacerModal">
                <h1 className="PlacerModal__title"><span id="PlacerModal--playersPick">{this.state.player}</span>X or O</h1>
                <button className="PlacerModal--xButton" onClick={this.props.handlePlacerX}>X</button>
                <button className="PlacerModal--oButton" onClick={this.props.handlePlacerO}>O</button>
            </div>
        );
    }
}