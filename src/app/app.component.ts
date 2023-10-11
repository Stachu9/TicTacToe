import {Component} from '@angular/core';
import {CellState} from "./services/game-engine/cell-state";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tictactoe';
}
