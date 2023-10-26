import {Injectable} from '@angular/core';
import {CellState} from "./cell-state";
import {GameState} from "./game-state";
import {State} from "./state";
import {BehaviorSubject, Observable} from "rxjs";
import {Coordinates} from "./coordinates";
import {ActivePlayer} from "./activePlayer";
import {GameFlow} from "./game-flow";

@Injectable({
  providedIn: 'root'
})
export class GameEngineService {

  public get state$(): Observable<State> {
    return this.stateSubject.asObservable();
  }

  private stateSubject = new BehaviorSubject<State>({
    boardState: [],
    gameState: GameState.WAITING_FOR_INIT,
    activePlayer: ActivePlayer.NONE
  });

  public sendGameState: Observable<GameState> = new Observable<GameState>();

  // TODO: convert into injection token
  boardDimensions = {
    height: 3,
    width: 3
  }

  gameFlow: GameFlow = GameFlow.START;

initialize()
{
  const boardState: CellState[][] = [];
  for (let i = 0; i < this.boardDimensions.height; i++) {
    boardState[i] = [];
    for (let j = 0; j < this.boardDimensions.width; j++) {
      boardState[i][j] = CellState.EMPTY;
    }
  }

  const state: State = {
       boardState,
       gameState: GameState.INPROGRESS,
       activePlayer: ActivePlayer.PLAYER1
    };
    this.gameFlow = GameFlow.START;
    this.stateSubject.next(state);
  }

  public makeMove(coordinates: Coordinates) {
    if (this.gameFlow === GameFlow.STOP) {
      return;
    }
    this.gameFlow = GameFlow.STOP;

    const state = this.stateSubject.value

    // check if move is allowed
    if ((this.movePermissibilityCheck(state, coordinates)) && (state.gameState === GameState.INPROGRESS)) {
      // conduct player move (update state)
      this.updateCellStates(state, coordinates);
      this.checkGameState(state, coordinates);
      this.stateSubject.next(state);

      if (state.gameState !== GameState.INPROGRESS) {
        return;
      }

      if (state.activePlayer === ActivePlayer.PLAYER1) {
        state.activePlayer = ActivePlayer.PLAYER2;
        // TODO: modify setTimeout
        setTimeout(() => this.makeMove(this.computerMove(state)), 500);
        return;
      } else {
        state.activePlayer = ActivePlayer.PLAYER1;
        this.gameFlow = GameFlow.START;
        return;
      }
    } else {
      return;
    }
  }

  movePermissibilityCheck(state: State, coordinates: Coordinates) {
    return (
      !(
        state.boardState[coordinates.row][coordinates.column] === CellState.PLAYER1
      ) &&
      !(state.boardState[coordinates.row][coordinates.column] === CellState.PLAYER2)
    );
  }

  updateCellStates(state: State, coordinates: Coordinates): void {
    if (state.activePlayer === ActivePlayer.PLAYER1) {
      state.boardState[coordinates.row][coordinates.column] = CellState.PLAYER1;
    } else {
      state.boardState[coordinates.row][coordinates.column] = CellState.PLAYER2;
    }
  }

  checkGameState(state: State, coordinates: Coordinates): void {
    //check if game should continue, or there is a winner
    if (
      state.boardState[0][0] === state.boardState[1][1] &&
      state.boardState[1][1] === state.boardState[2][2] &&
      state.boardState[1][1] !== CellState.EMPTY
    ) {
      this.getFinalGameState(state.boardState[0][0], state);
      return;
    } else if (
      state.boardState[0][2] === state.boardState[1][1] &&
      state.boardState[1][1] === state.boardState[2][0] &&
      state.boardState[1][1] !== CellState.EMPTY
    ) {
      this.getFinalGameState(state.boardState[0][2], state);
      return;
    }
    let y = 0;
    for (let i = 0; i < 3; i++) {
      if (
        state.boardState[i][0] === state.boardState[i][1] &&
        state.boardState[i][1] === state.boardState[i][2] &&
        state.boardState[i][1] !== CellState.EMPTY
      ) {
        this.getFinalGameState(state.boardState[i][0], state);
        return;
      }
      if (
        state.boardState[0][i] === state.boardState[1][i] &&
        state.boardState[1][i] === state.boardState[2][i] &&
        state.boardState[1][i] !== CellState.EMPTY
      ) {
        this.getFinalGameState(state.boardState[0][i], state);
        return;
      }
      for (let j = 0; j < 3; j++) {
        if (state.boardState[i][j] !== CellState.EMPTY) {
          y++;
        }
      }
      if (y === 9) {
        state.gameState = GameState.DRAW;
        return;
      }
    }
    state.gameState = GameState.INPROGRESS;
    return;
  }

  getFinalGameState(winningPlayer: CellState, state: State): void {
    if (winningPlayer === CellState.PLAYER1)
    {
      state.gameState = GameState.PLAYERWIN;
    } else if (winningPlayer === CellState.PLAYER2) {
      state.gameState = GameState.COMPWIN;
    } else {
      throw new Error("getFinalGameState input Error");
    }

  }

  computerMove(state: State) {

    this.gameFlow = GameFlow.START

    let testWinningMove: Coordinates;
    let allowedMoves: Coordinates[] = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let testState = structuredClone(state);
        testWinningMove = {
          row: i,
          column: j
        };
        if (this.movePermissibilityCheck(testState, testWinningMove)) {
          allowedMoves.push(testWinningMove);
          this.updateCellStates(testState, testWinningMove);
          this.checkGameState(testState, testWinningMove);
          if (testState.gameState === GameState.COMPWIN) {
            return testWinningMove;
          }
        }
      }
    }
    return allowedMoves[Math.floor((Math.random()*allowedMoves.length))];
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
