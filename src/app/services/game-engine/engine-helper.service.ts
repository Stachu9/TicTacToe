import { Injectable } from '@angular/core';
import {State} from "./state";
import {Coordinates} from "./coordinates";
import {CellState} from "./cell-state";
import {ActivePlayer} from "./activePlayer";
import {GameState} from "./game-state";

@Injectable({
  providedIn: 'root'
})
export class EngineHelperService {

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
  activePlayerChange(state: State) {
    if (state.activePlayer === ActivePlayer.PLAYER1) {
      state.activePlayer = ActivePlayer.PLAYER2
    } else {
      state.activePlayer = ActivePlayer.PLAYER1
    }
  }
}
