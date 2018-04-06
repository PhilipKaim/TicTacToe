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
    const allFalse = Object.keys(this.state.modals).every((k) => this.state.modals[k] === false);

    if (allFalse === true) {
      score.classList.add('active');
      board.classList.add('active');
    }
  }

  handleWinner = () => {

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

    function checkForWinner(board) {

      for (let i = 0; i < winningCombos.length; i++) {
        for (let j = 0; j < winningCombos[i].length; j++) {
          if (winningCombos[i].every(el => board[el] === 'X')) {
            return 'X';
          } else if (winningCombos[i].every(el => board[el] === 'O')) {
            return 'O';
          }
        }
      }
    }

    if (checkForWinner(this.state.board) === 'X') {
      this.setState((prevState) => ({
        score: {
          playerX: prevState.score.playerX + 1,
          playerO: prevState.score.playerO
        },
        winner: 'X',
        modals: {
          winner: true
        }
      }));
    } else if (checkForWinner(this.state.board) === 'O') {
      this.setState((prevState) => ({
        score: {
          playerX: prevState.score.playerX,
          playerO: prevState.score.playerO + 1
        },
        winner: 'O',
        modals: {
          winner: true
        }
      })); 
    }
  }

  handleMove = (place) => {

    const scoreX = document.querySelector('.score--x');
    const scoreO = document.querySelector('.score--o');

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

        // highlighted background for players turn
        if (scoreO.classList.contains('active')) {
          scoreO.classList.remove('active');
          scoreX.classList.add('active');
        } else if (scoreX.classList.contains('active')) {
          scoreX.classList.remove('active');
          scoreO.classList.add('active');
        }
      }
    }

    this.setState((prevState) => ({
      board: this.state.board,
      placer: this.state.placer === 'X' ? this.state.placer = 'O' : this.state.placer = 'X'
    }));

    // checks for a winner
    this.handleWinner();
    
  }

  handlePlacerX = () => {
    const scoreX = document.querySelector('.score--x');
    const scoreO = document.querySelector('.score--o');

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

    // adds background highlight for active player X
    scoreX.classList.add('active');
  };

  handlePlacerO = () => {
    const scoreX = document.querySelector('.score--x');
    const scoreO = document.querySelector('.score--o');

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

    // adds background heighlight for active player O
    scoreO.classList.add('active');
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
    
    console.log(this.state.score);
    
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
