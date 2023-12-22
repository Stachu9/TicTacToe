import {Injectable} from '@angular/core';
import {State} from "../game-engine/state";
import {Coordinates} from "../game-engine/coordinates";
import {GameState} from "../game-engine/game-state";
import {EngineHelperService} from "../game-engine/engine-helper.service";
import {Observable, of} from "rxjs";
import {PlayerTurn} from "../game-engine/player-turn";

@Injectable({
  providedIn: 'root'
})
export class ComputerPlayerService implements PlayerTurn {

  constructor(
    private engineHelper: EngineHelperService
  ) {
  }

  private calculateComputerMove(state: State): Coordinates {
    let testWinningMove: Coordinates;
    let allowedMoves: Coordinates[] = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let testState = structuredClone(state);
        testWinningMove = {
          row: i,
          column: j
        };
        if (this.engineHelper.movePermissibilityCheck(testState, testWinningMove)) {
          allowedMoves.push(testWinningMove);
          this.engineHelper.updateCellStates(testState, testWinningMove);
          this.engineHelper.checkGameState(testState, testWinningMove);
          if (testState.gameState === GameState.COMPWIN || testState.gameState === GameState.PLAYERWIN) {
            return testWinningMove;
          }
        }
      }
    }
    return allowedMoves[Math.floor((Math.random() * allowedMoves.length))];
  };

  makeMove(state: State): Promise<Coordinates> {
    return new Promise(
      (resolve) => {
        setTimeout(() => resolve(this.calculateComputerMove(state)), 2000);
      }
    );
  }
}
