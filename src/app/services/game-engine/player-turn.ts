import {State} from "./state";
import {Coordinates} from "./coordinates";

export interface PlayerTurn {
  makeMove(state: State): Promise<Coordinates>;
}
