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
    mode: {
      onePlayer: undefined,
      twoPlayer: undefined,
    },
    score: {
      playerX: 0,
      playerO: 0
    },
    modals: {
      mode: 'inactive',
      placer: 'active',
      winner: 'inactive'
    },
    board: [0, 1, 2, 3, 4, 5, 6, 7, 8]
  }


  render() {
    return (
      <div>
        <Score />
        <Board />
        {this.state.modals.mode === 'active' ? <ModeModal /> : ''}
        {this.state.modals.placer === 'active' ? <PlacerModal /> : ''}
        {this.state.modals.winner === 'active' ? <WinnerModal /> : ''}
      </div>
    );
  }
}
