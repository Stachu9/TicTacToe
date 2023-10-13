import {CellState} from "./cell-state";
import {GameState} from "./game-state";
import {Activeplayer} from "./activeplayer";

export interface State {
  gameState: GameState;
  boardState: CellState[][];
  activePlayer: Activeplayer;
}
