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
    board: ['', '', '', '', '', '', '', '', ''],
    winningCombos: [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
  }

  componentDidUpdate() {
    const score = document.querySelector('.score');
    const board = document.querySelector('.board');

    // checks to see if any modals are open
    const allFalse = Object.keys(this.state.modals).every((k) => this.state.modals[k] === false);

    // if modals are not open show the playing board and score board
    if (allFalse === true) {
      score.classList.add('active');
      board.classList.add('active');
    }
  }

  handleWinner = () => {

    const winningCombos = this.state.winningCombos;

    function checkForWinner(board) {

      // checks to see if the placer has three in a row and returns the placer to be used as the winner
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

    // checks to see if all spaces are filled
    // if all are filled no one wins
    const tieGame = this.state.board.every(el => el !== '');

    if (tieGame) {
      this.setState(() => ({
        winner: 'No One',
        modals: {
          winner: true
        }
      }));
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

      const { mode, board, turn } = this.state;

      const onePlayerReplaceAndSwitch = i === place && board[i] === '' && mode.onePlayer === true && (mode.twoPlayer === false || undefined) && this.state.turn.player === true;
      const twoPlayerReplaceAndSwitch = i === place && board[i] === '' && mode.twoPlayer === true && (mode.onePlayer === false || undefined);

      if (onePlayerReplaceAndSwitch) {
        this.state.board[i] = this.state.placer;

        this.setState(() => ({
          turn: {
            player: this.state.turn.player === true ? false : true,
            computer: this.state.turn.computer === true ? false : true
          }
        }));
        this.handleComputersMove();
      } else if (twoPlayerReplaceAndSwitch) {
        this.state.board[i] = this.state.placer;
        // this.handleComputersMove();

        // highlighted background for players turn
        if (scoreO.classList.contains('active')) {
          scoreO.classList.remove('active');
          scoreX.classList.add('active');
        } else if (scoreX.classList.contains('active')) {
          scoreX.classList.remove('active');
          scoreO.classList.add('active');
        }

        this.setState((prevState) => ({
          board: this.state.board,
          placer: this.state.placer === 'X' ? this.state.placer = 'O' : this.state.placer = 'X'
        }));
      }
    }

    // checks for a winner
    this.handleWinner();
    
  }
  
  handleComputersMove = () => {

    const { winningCombos, board, placer } = this.state;
    let random = false;
    let setTheState = false;

    // if no counter move available, computer will place in a random open space
    function randomPlacer() {
      let indexes = [];
      let i = -1;

      while ((i = board.indexOf('', i + 1)) != -1){
        indexes.push(i);
      }

      const randomPlace = indexes[Math.floor(Math.random() * indexes.length)];

      board[randomPlace] = placer === 'X' ? 'O' : 'X';

      setTheState = true;
    }

    for (let i = 0; i < winningCombos.length; i++) {
      const copy = winningCombos[i].slice();
      const filterSpacesAndO = copy.filter(el => board[el] === 'X');
      const filterSpacesAndX = copy.filter(el => board[el] === 'O');
      const filterPlacers = copy.filter(el => board[el] === '');
      
      // counters players move
      if (filterPlacers.length === 1 && filterSpacesAndO.length === 2 || filterSpacesAndX.length === 2) {
        board[filterPlacers[0]] = this.state.placer === 'X' ? 'O' : 'X';

        this.setState(() => ({
          board: board,
          turn: {
            player: true,
            computer: false
          }
        }));

        random = false;

        break;
      } else {
        random = true;
      }
    }

    if (random) {
      randomPlacer();
    }

    // sets the turn back to the player after computers random move
    if (setTheState) {
      this.setState(() => ({
        board: board,
        turn: {
          player: true,
          computer: false
        }
      }));
    }

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
    
  }

  render() {
    return (
      <div>
        <Score score={this.state.score} />
        <Board board={this.state.board} handleMove={this.handleMove} />
        {this.state.modals.mode === true ? <ModeModal mode={this.state.mode} handleOnePlayer={this.handleOnePlayer} handleTwoPlayer={this.handleTwoPlayer} /> : ''}
        {this.state.modals.placer === true ? <PlacerModal placer={this.state.placer} handlePlacerX={this.handlePlacerX} handlePlacerO={this.handlePlacerO} mode={this.state.mode} /> : ''}
        {this.state.modals.winner === true ? <WinnerModal winner={this.state.winner} handleResetBoard={this.handleResetBoard} /> : ''}
      </div>
    );
  }
}
