import {Component, OnInit} from '@angular/core';
import {CellState} from "../../services/game-engine/cell-state";
import {GameEngineService} from "../../services/game-engine/game-engine.service";
import {State} from "../../services/game-engine/state";
import {Observable} from "rxjs";
import {GameState} from "../../services/game-engine/game-state";
import {Coordinates} from "../../services/game-engine/coordinates";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  state: State = {
    boardState : [],
    gameState : GameState.WAITING_FOR_INIT
  }

  // state$: Observable<State>;



  constructor(
    private gameEngineService: GameEngineService
  ) {}

  ngOnInit(): void {
    this.gameEngineService.state.subscribe((v) => this.state = v);
    this.gameEngineService.initialize();
  }


  selectCell(cCoordinates: Coordinates) {
    // if (this.boardState[i][j] === CellState.EMPTY) {
    //   this.boardState[i][j] = CellState.PLAYER1;
    // } else if (this.boardState[i][j] === CellState.PLAYER1) {
    //   this.boardState[i][j] = CellState.PLAYER2;
    // } else {
    //   this.boardState[i][j] = CellState.EMPTY;
    // }
  }
}
