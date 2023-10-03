import {Component, EventEmitter, Input, OnChanges, Output, SimpleChange} from '@angular/core';
import {CellState} from "./cell-state";

@Component({
  selector: 'app-single-cell',
  templateUrl: './single-cell.component.html',
  styleUrls: ['./single-cell.component.css']
})
export class SingleCellComponent {
  @Output() selected = new EventEmitter();
  @Input() state: CellState = CellState.EMPTY;

  CellState = CellState;

  onSelect() {
    this.selected.emit();
  }
}