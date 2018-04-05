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

  componentDidUpdate() {
    const score = document.querySelector('.score');
    const board = document.querySelector('.board');
    const allTrue = Object.keys(this.state.modals).every((k) => this.state.modals[k] === false);

    if (allTrue === true) {
      score.classList.add('active');
      board.classList.add('active');
    }
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
    ];

    let spacesFilledX = 0;
    let spacesFilledO = 0;

    function checkForWinner(board) {

      for (let i = 0; i < winningCombos.length; i++) {
        for (let j = 0; j < winningCombos[i].length; j++) {
          if (board[winningCombos[i][j]] === 'X') {
            spacesFilledX++;
          } else if (board[winningCombos[i][j]] === 'O') {
            spacesFilledO++;
          }

          if (j === (winningCombos.length - 1)) {
            spacesFilledO = 0;
            spacesFilledX = 0;
          }
        }
      }

      if (spacesFilledX === 3) {
        return 'X';
      } else if (spacesFilledO === 3) {
        return 'O';
      }

    }

    if (checkForWinner(this.state.board) === 'X') {
      console.log(spacesFilledX);
      
      this.setState(() => ({
        winner: 'X',
        modals: {
          winner: true
        }
      }));
    } else if (checkForWinner(this.state.board) === 'O') {
      console.log(spacesFilledO);
      
      this.setState(() => ({
        winner: 'O',
        modals: {
          winner: true
        }
      }));
    }

    // replaces the state board index with the state placer
    for (let i = 0; i < this.state.board.length; i++) {

      const onePlayerReplaceAndSwitch = i === place && this.state.board[i] === '' && this.state.mode.onePlayer === true && this.state.turn.player === true;
      const twoPlayerReplaceAndSwitch = i === place && this.state.board[i] === '' && this.state.mode.twoPlayer === true;

      if (onePlayerReplaceAndSwitch) {
        this.state.board[i] = this.state.placer;

        this.setState(() => ({
          turn: {
            player: this.state.turn.player === true ? false : true,
            computer: this.state.turn.computer === true ? false : true
          }
        }));
      } else if (twoPlayerReplaceAndSwitch) {
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
      },
      turn: {
        player: true,
        computer: false
      }
    }));
  };

  handlePlacerO = () => {
    this.setState(() => ({
      placer: 'O',
      modals: {
        placer: false
      },
      turn: {
        player: true,
        computer: false
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

    //  NOT WORKING TO INCREMENT SCORES !!!!
    // if (this.state.placer === 'X') {
    //   this.setState((prevState) => ({
    //     score: {
    //       playerX: prevState + 1,
    //     }
    //   }));
    // } else if (this.state.placeer === 'O') {
    //   this.setState((prevState) => ({
    //     score: {
    //       playerO: prevState + 1
    //     }
    //   }));
    // }

    console.log(this.state.score.playerX);
    
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
