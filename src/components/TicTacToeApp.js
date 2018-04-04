import React from 'react';
import Board from './Board';
import Score from './Score';
import WinnerModal from './WinnerModal';
import ModeModal from './ModeModal';
import PlacerModal from './PlacerModal';

export default class TicTacToeApp extends React.Component {
  
  state = {
    turn: {
      computer: undefined,
      player: undefined,
    },
    placer: 'X',
    mode: {
      onePlayer: undefined,
      twoPlayer: undefined,
    },
    score: {
      playerX: 0,
      playerO: 0
    },
    modals: {
      mode: false,
      placer: false,
      winner: true
    },
    winner: undefined,
    board: ['X', 'X', 'O', '', '', '', '', '', '']
  }

  handleMove = (place) => {

    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    // replaces the state board index with the state placer
    for (let i = 0; i < this.state.board.length; i++) {
      if (i === place && this.state.board[i] === '') {
        this.state.board[i] = this.state.placer;
      }
    }

    this.setState((prevState) => ({
      board: this.state.board,
      placer: this.state.placer === 'X' ? this.state.placer = 'O' : this.state.placer = 'X'
    }));    
    
  }

  handlePlacerX = () => {
    this.setState(() => ({
      placer: 'X',
      modals: {
        placer: false
      }
    }));
  };

  handlePlacerO = () => {
    this.setState(() => ({
      placer: 'O',
      modals: {
        placer: false
      }
    }));
  };

  handleOnePlayer= () => {
    this.setState(() => ({
      mode: {
        onePlayer: true,
        twoPlayer: false
      },
      modals: {
        mode: false,
        placer: true
      }
    }));
  }

  handleTwoPlayer = () => {
    this.setState(() => ({
      mode: {
        onePlayer: false,
        twoPlayer: true
      },
      modals: {
        mode: false,
        placer: true
      }
    }));
  }

  handleXWins = () => {
    this.setState(() => ({
      winner: 'X',
      modals: {
        winner: true
      }
    }));
  }

  handleOWins = () => {
    this.setState(() => ({
      winner: 'O',
      modals: {
        winner: true
      }
    }));
  }

  handleResetBoard = () => {

    const updatedBoard = this.state.board.map((i, el) => {
      return el = '';
    });

    this.setState(() => ({
      board: updatedBoard,
      modals: {
        winner: false
      }
    }));

    console.log(this.state.board);
    
  }

  render() {
    return (
      <div>
        <Score score={this.state.score} />
        <Board board={this.state.board} handleMove={this.handleMove} />
        {this.state.modals.mode === true ? <ModeModal mode={this.state.mode} handleOnePlayer={this.handleOnePlayer} handleTwoPlayer={this.handleTwoPlayer} /> : ''}
        {this.state.modals.placer === true ? <PlacerModal placer={this.state.placer} handlePlacerX={this.handlePlacerX} handlePlacerO={this.handlePlacerO} /> : ''}
        {this.state.modals.winner === true ? <WinnerModal winner={this.state.winner} handleResetBoard={this.handleResetBoard} /> : ''}
      </div>
    );
  }
}
