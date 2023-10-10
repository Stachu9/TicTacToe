import {Component} from '@angular/core';
import {CellState} from "../sigle-cell/cell-state";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {

  boardState : CellState[][];

  // TODO: convert into injection token
  boardDimensions = {
    height: 3,
    width: 3
  }

  constructor()
  {
    this.boardState = [];
    for (let i = 0; i < this.boardDimensions.height; i++) {
      this.boardState[i] = [];
      for (let j = 0; j < this.boardDimensions.width; j++) {
       this.boardState[i][j] = CellState.EMPTY;
      }
    }
  }

  selectCell(i : number, j : number) {
    if (this.boardState[i][j] === CellState.EMPTY) {
      console.log(i, j)
      this.boardState[i][j] = CellState.PLAYER1;
    } else if (this.boardState[i][j] === CellState.PLAYER1) {
      this.boardState[i][j] = CellState.PLAYER2;
    } else {
      this.boardState[i][j] = CellState.EMPTY;
    }
  }
}
