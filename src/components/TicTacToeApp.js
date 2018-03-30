import React from 'react';
import Board from './Board';
import Score from './Score';

export default class TicTacToeApp extends React.Component {
  render() {
    return (
      <div>
        <Score />
        <Board />
      </div>
    );
  }
}
