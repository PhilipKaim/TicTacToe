import React, { Component } from 'react';

export default class Board extends Component {
    render() {
        return (
            <div className="board">
                <div className="board--0" id="0"></div>
                <div className="board--1" id="1"></div>
                <div className="board--2" id="2"></div>
                <div className="board--3" id="3"></div>
                <div className="board--4" id="4"></div>
                <div className="board--5" id="5"></div>
                <div className="board--6" id="6"></div>
                <div className="board--7" id="7"></div>
                <div className="board--8" id="8"></div>
            </div>
        );
    }
}

