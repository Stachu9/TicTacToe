import {Injectable} from '@angular/core';
import {CellState} from "./cell-state";
import {GameState} from "./game-state";
import {State} from "./state";
import {BehaviorSubject, Observable, of, switchMap} from "rxjs";
import {Coordinates} from "./coordinates";
import {ActivePlayer} from "./activePlayer";
import {EngineHelperService} from "./engine-helper.service";
import {PlayerService} from "../player-service/player.service";

@Injectable({
  providedIn: 'root'
})
export class GameEngineService {

  constructor(
    private engineHelper: EngineHelperService,
    private playerService: PlayerService
  ){}

  public get state$(): Observable<State> {
    return this.stateSubject.asObservable();
  }

  private stateSubject = new BehaviorSubject<State>({
    boardState: [],
    gameState: GameState.WAITING_FOR_INIT,
    activePlayer: ActivePlayer.NONE
  });

  // TODO: convert into injection token
  boardDimensions = {
    height: 3,
    width: 3
  }

  initialize() {
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
    this.stateSubject.next(state);
    this.gameLoop()
  }

  private gameLoop() {
    const switched: Observable<Coordinates> = this.stateSubject.pipe(switchMap(x => this.playerService.makeMove(x)))
    switched.subscribe(x => {
        this.makeMove(x);
        this.engineHelper.activePlayerChange(this.stateSubject.value)
      }
    )
  }


  public makeMove(coordinates: Coordinates) {

    const state = this.stateSubject.value

    // check if move is allowed
    if ((this.engineHelper.movePermissibilityCheck(state, coordinates)) && (state.gameState === GameState.INPROGRESS)) {
      // conduct player move (update state)
      this.engineHelper.updateCellStates(state, coordinates);
      this.engineHelper.checkGameState(state, coordinates);
      this.stateSubject.next(state);
    } else {
      return
    }
  }
}

