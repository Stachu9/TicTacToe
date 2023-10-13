import {Injectable, OnInit} from '@angular/core';
import {CellState} from "./cell-state";
import {GameState} from "./game-state";
import {State} from "./state";
import {BehaviorSubject, Observable} from "rxjs";
import {Coordinates} from "./coordinates";
import {Activeplayer} from "./activeplayer";

@Injectable({
  providedIn: 'root'
})
export class GameEngineService implements OnInit {

  public get state$(): Observable<State> {
    return this.stateSubject.asObservable();
  }

  private stateSubject = new BehaviorSubject<State>({
    boardState: [],
    gameState: GameState.WAITING_FOR_INIT,
    activePlayer: Activeplayer.NONE
  });

  constructor() {}

  ngOnInit(): void {
}

   //state: State = {
   //  boardState : [],
   //  gameState : GameState.WAITING_FOR_INIT
   //};

  // TODO: convert into injection token
  boardDimensions = {
    height: 3,
    width: 3
  }

  initialize()
  {
    const state: State = {
       boardState : [],
       gameState : GameState.INPROGRESS,
       activePlayer: Activeplayer.PLAYER1
    };
    state.boardState = [];
    for (let i = 0; i < this.boardDimensions.height; i++) {
      state.boardState[i] = [];
      for (let j = 0; j < this.boardDimensions.width; j++) {
        state.boardState[i][j] = CellState.EMPTY;
      }
    }
    state.gameState = GameState.BEGINNING;
    this.stateSubject.next(state);
  }

  public makeMove(coordinates: Coordinates) {
    const state = this.stateSubject.value

    // if (state.gameState !== GameState.INPROGRESS) {
    //   this.showMessage("PRESS STARTBUTTON !!!");
    //   return;
    // }

    // check if move is allowed
    if (this.movePremissibilityCheck(state, coordinates)) {
      // conduct player move (update state)
      this.updateCellStates(state, coordinates);
      this.checkGameState(state, coordinates);
      // finishAlerts(state);

      if (state.gameState !== GameState.INPROGRESS) {
        return;
      }

      // conduct computer move
      if (state.activePlayer === Activeplayer.PLAYER1) {
        state.activePlayer = Activeplayer.PLAYER2;
        this.makeMove(this.computerMove(state))
      } else {
        state.activePlayer = Activeplayer.PLAYER1;
        return;
      }



      // finishAlerts(state);
      // if (state.gameState !== GameState.INPROGRESS) {
      //   return;
      // }
    } else {
      // showMessage("Wrong move, try again");
    }
  }

  movePremissibilityCheck(state: State, coordinates: Coordinates) {
    return (
      !(
        state.boardState[coordinates.row][coordinates.column] === CellState.PLAYER1
      ) &&
      !(state.boardState[coordinates.row][coordinates.column] === CellState.PLAYER2)
    );
  }

  updateCellStates(state: State, coordinates: Coordinates): void {
    if (state.activePlayer === Activeplayer.PLAYER1) {
      state.boardState[coordinates.row][coordinates.column] = CellState.PLAYER1;
    } else {
      state.boardState[coordinates.row][coordinates.column] = CellState.PLAYER2;
    }
  }

  checkGameState(state: State, coordinates: Coordinates): void {
    // Update state of game array


    //check if game should continue, or there is a winner
    if (
      state.boardState[0][0] === state.boardState[1][1] &&
      state.boardState[1][1] === state.boardState[2][2] &&
      state.boardState[1][1] !== CellState.EMPTY
    ) {
      this.getFinalGameState(state.boardState[0][0], state);
    } else if (
      state.boardState[0][2] === state.boardState[1][1] &&
      state.boardState[1][1] === state.boardState[2][0] &&
      state.boardState[1][1] !== CellState.EMPTY
    ) {
      this.getFinalGameState(state.boardState[0][2], state);
    }
    let y = 0;
    for (let i = 0; i < 3; i++) {
      if (
        state.boardState[i][0] === state.boardState[i][1] &&
        state.boardState[i][1] === state.boardState[i][2] &&
        state.boardState[i][1] !== CellState.EMPTY
      ) {
        this.getFinalGameState(state.boardState[i][0], state);
      }
      if (
        state.boardState[0][i] === state.boardState[1][i] &&
        state.boardState[1][i] === state.boardState[2][i] &&
        state.boardState[1][i] !== CellState.EMPTY
      ) {
        this.getFinalGameState(state.boardState[0][i], state);
      }
      for (let j = 0; j < 3; j++) {
        if (state.boardState[i][j] !== CellState.EMPTY) {
          y++;
        }
      }
      if (y === 9) {
        state.gameState = GameState.DRAW;
      }
    }
    state.gameState = GameState.INPROGRESS;
  }

  getFinalGameState(winningPlayer: CellState, state: State): void {
    if (winningPlayer === CellState.PLAYER1)
    {
      state.gameState = GameState.PLAYERWIN;
    } else if (winningPlayer === CellState.PLAYER2) {
      state.gameState = GameState.COMPWIN;
    }
    throw new Error("getFinalGameState input Error");
  }

  computerMove(state: State) {
    let testWinningMove: Coordinates;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let testState = structuredClone(state);
        testWinningMove = {
          row: i,
          column: j
        };
        if (this.movePremissibilityCheck(testState, testWinningMove)) {
          this.checkGameState(testState, testWinningMove);
          if (testState.gameState === GameState.COMPWIN) {
            return testWinningMove;
          }
        }
      }
    }

    let testCoordinates: Coordinates;
    do {
      testCoordinates = {
        row: Math.floor(Math.random() * 3),
        column: Math.floor(Math.random() * 3)
      }
    } while (!this.movePremissibilityCheck(state, testCoordinates))

    return testCoordinates;
  }


  // showMessage(message: string) {
  //   setTimeout(() => alert(message), 0);
  // }
  //
  // finishAlerts(state: State) {
  //   if (state.gameState === GameState.PLAYERWIN) {
  //     this.showMessage("you win");
  //   } else if (state.gameState === GameState.COMPWIN) {
  //     this.showMessage("comp win");
  //   } else if (state.gameState === GameState.DRAW) {
  //     this.showMessage("draw");
  //   }
  // }
}
