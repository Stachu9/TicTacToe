import {Injectable} from '@angular/core';
import {CellState} from "./cell-state";
import {GameState} from "./game-state";
import {State} from "./state";

@Injectable({
  providedIn: 'root'
})
export class GameEngineService {

  state: State = {
    boardState : [],
    gameState : GameState.WAITING_FOR_INIT
  };

  // TODO: convert into injection token
  boardDimensions = {
    height: 3,
    width: 3
  }

  initialize()
  {
    this.state.boardState = [];
    for (let i = 0; i < this.boardDimensions.height; i++) {
      this.state.boardState[i] = [];
      for (let j = 0; j < this.boardDimensions.width; j++) {
        this.state.boardState[i][j] = CellState.EMPTY;
      }
    }
    this.state.gameState = GameState.BEGINNING;
  }

  movePremissibilityCheck(state: State, coordinates) {
    return (
      !(
        state.gameArr[+coordinates.row][+coordinates.col] === CellState.PLAYER1
      ) &&
      !(state.gameArr[+coordinates.row][+coordinates.col] === CellState.PLAYER2)
    );
  }
}
