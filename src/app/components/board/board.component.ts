import {Component, OnInit} from '@angular/core';
import {CellState} from "../../services/game-engine/cell-state";
import {GameEngineService} from "../../services/game-engine/game-engine.service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor(
    private gameEngineService: GameEngineService
  ) {}

  ngOnInit(): void {
    this.gameEngineService.initialize();
  }


  selectCell(i : number, j : number) {
    if (this.boardState[i][j] === CellState.EMPTY) {
      this.boardState[i][j] = CellState.PLAYER1;
    } else if (this.boardState[i][j] === CellState.PLAYER1) {
      this.boardState[i][j] = CellState.PLAYER2;
    } else {
      this.boardState[i][j] = CellState.EMPTY;
    }
  }
}
