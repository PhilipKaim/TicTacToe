import React from 'react';
import Board from './Board';
import Score from './Score';
import WinnerModal from './WinnerModal';

export default class TicTacToeApp extends React.Component {
  state = {
    spaces: {
      space0: false,
      space1: false,
      space2: false,
      space3: false,
      space4: false,
      space5: false,
      space6: false,
      space7: false,
      space8: false,
    },
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
      placer: 'inactive',
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
