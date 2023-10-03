import {Component} from '@angular/core';
import {CellState} from "../sigle-cell/cell-state";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {

transmitter : CellState = CellState.EMPTY;
  setCellState() {
    if (this.transmitter === CellState.EMPTY) {
      this.transmitter = CellState.PLAYER1;
    } else if (this.transmitter === CellState.PLAYER1) {
      this.transmitter = CellState.PLAYER2;
    } else {
      this.transmitter = CellState.EMPTY;
    }
  }
}
