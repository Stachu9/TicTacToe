import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameEngineService} from "../../services/game-engine/game-engine.service";
import {State} from "../../services/game-engine/state";
import {distinctUntilChanged, map, Observable, Subscription} from "rxjs";
import {GameState} from "../../services/game-engine/game-state";
import {Coordinates} from "../../services/game-engine/coordinates";
import {MessageService} from "../../services/game-engine/message.service";
import {ActivePlayer} from "../../services/game-engine/activePlayer";
import {CellState} from "../../services/game-engine/cell-state";
import {EngineHelperService} from "../../services/game-engine/engine-helper.service";
import {PlayerTurn} from "../../services/game-engine/player-turn";
import {ComputerPlayerService} from "../../services/player-service/computer-player.service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnDestroy {
  state$: Observable<State>;
  private gameStateChangesSub: Subscription;
  private gameEngineService: GameEngineService;

  constructor(
    private messageService: MessageService,
    private engineHelper: EngineHelperService,
  ) {
    this.gameEngineService = new GameEngineService(engineHelper);
    this.state$ = this.gameEngineService.state$;
    this.gameStateChangesSub = this.state$
      .pipe(
        map(state => state.gameState),
        distinctUntilChanged()
      ).subscribe((v) => this.messageText(v));
  }

  ngOnInit(): void {
    // this.gameEngineService.state$.subscribe((v) => this.state = v);
    // TODO change implementation to use factory design pattern
    let playerService: PlayerTurn = new ComputerPlayerService(this.engineHelper);
    this.gameEngineService.initialize(playerService);
  }

  ngOnDestroy(): void {
    this.gameStateChangesSub.unsubscribe();
  }

  messageText(gameState: GameState): void {
    if (gameState === GameState.PLAYERWIN) {
      this.messageService.showMessage("Player win!")
    } else if (gameState === GameState.COMPWIN) {
      this.messageService.showMessage("Comp win!")
    } else if (gameState === GameState.DRAW) {
      this.messageService.showMessage("Draw")
    }
  }

  public resetGame(): void {
    this.gameEngineService.reset();
  }

  selectCell(coordinates: Coordinates) {
      this.gameEngineService.makeMove(coordinates);
  }

  isCellDisabled(cellState: CellState, activePlayer: ActivePlayer, gameState: GameState) {
    return (activePlayer === ActivePlayer.PLAYER2 || cellState !== CellState.EMPTY || gameState !== GameState.INPROGRESS);
  }

}
