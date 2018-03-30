import React, { Component } from 'react';

export default class Score extends Component {
    render() {
        return (
            <div className="score">
                <div className="score--x">
                    <span className="score__identifyer">X:</span>
                    <span id="score--x">score</span>
                </div>
                <div className="score--o">
                    <span className="score__identifyer">O:</span>
                    <span id="score--o">score</span>
                </div>
            </div>
        );
    }
}