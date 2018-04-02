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
    placer: undefined,
    mode: {
      onePlayer: undefined,
      twoPlayer: undefined,
    },
    score: {
      playerX: 0,
      playerO: 0
    },
    modals: {
      mode: true,
      placer: false,
      winner: false
    },
    winner: undefined,
    board: ['', '', '', '', '', '', '', '', '']
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
      winner: 'X'
    }));
  }

  handleOWins = () => {
    this.setState(() => ({
      winner: 'O'
    }));
  }

  render() {
    return (
      <div>
        <Score score={this.state.score} />
        <Board board={this.state.board} />
        {this.state.modals.mode === true ? <ModeModal mode={this.state.mode} handleOnePlayer={this.handleOnePlayer} handleTwoPlayer={this.handleTwoPlayer} /> : ''}
        {this.state.modals.placer === true ? <PlacerModal placer={this.state.placer} handlePlacerX={this.handlePlacerX} handlePlacerO={this.handlePlacerO}/> : ''}
        {this.state.modals.winner === true ? <WinnerModal winner={this.state.winner}/> : ''}
      </div>
    );
  }
}
