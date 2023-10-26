import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CellState} from "../../services/game-engine/cell-state";

@Component({
  selector: 'app-single-cell',
  templateUrl: './single-cell.component.html',
  styleUrls: ['./single-cell.component.css']
})
export class SingleCellComponent {
  @Output() selected = new EventEmitter();
  @Input() state: CellState = CellState.EMPTY;
  @Input() disabled: boolean = true;

  CellState = CellState;

  onSelect() {
    if (!this.disabled) {
      this.selected.emit();
    }
  }
}
