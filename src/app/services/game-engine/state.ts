import {CellState} from "./cell-state";
import {GameState} from "./game-state";

export interface State {
  gameState: GameState;
  boardState: CellState[][];
}
