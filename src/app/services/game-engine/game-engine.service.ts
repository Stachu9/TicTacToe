import {Injectable} from '@angular/core';
import {CellState} from "./cell-state";
import {GameState} from "./game-state";
import {State} from "./state";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameEngineService {

  state = new Subject<State>();

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
       gameState : GameState.WAITING_FOR_INIT
    };
    state.boardState = [];
    for (let i = 0; i < this.boardDimensions.height; i++) {
      state.boardState[i] = [];
      for (let j = 0; j < this.boardDimensions.width; j++) {
        state.boardState[i][j] = CellState.EMPTY;
      }
    }
    state.gameState = GameState.BEGINNING;
    this.state.next(state);
  }

  // movePremissibilityCheck(state: State, coordinates: typeof coordinates) {
  //   return (
  //     !(
  //       state.gameArr[+coordinates.row][+coordinates.col] === CellState.PLAYER1
  //     ) &&
  //     !(state.gameArr[+coordinates.row][+coordinates.col] === CellState.PLAYER2)
  //   );
  // }
}
