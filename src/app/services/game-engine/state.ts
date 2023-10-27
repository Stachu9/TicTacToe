import {CellState} from "./cell-state";
import {GameState} from "./game-state";
import {ActivePlayer} from "./activePlayer";

export interface State {
  gameState: GameState;
  boardState: CellState[][];
  activePlayer: ActivePlayer;

}
