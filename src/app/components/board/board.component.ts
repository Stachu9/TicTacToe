import {Component, OnDestroy, OnInit} from '@angular/core';
import {CellState} from "../../services/game-engine/cell-state";
import {GameEngineService} from "../../services/game-engine/game-engine.service";
import {State} from "../../services/game-engine/state";
import {distinctUntilChanged, map, Observable, Subject, Subscription} from "rxjs";
import {GameState} from "../../services/game-engine/game-state";
import {Coordinates} from "../../services/game-engine/coordinates";
import {MessageService} from "../../services/game-engine/message.service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnDestroy {
  state$: Observable<State>;
  private gameStateChangesSub: Subscription;

  constructor(
    private gameEngineService: GameEngineService,
    private messageService: MessageService
  ) {
    this.state$ = this.gameEngineService.state$
    this.gameStateChangesSub = this.state$
      .pipe(
        map(state => state.gameState),
        distinctUntilChanged()
      ).subscribe((v) => this.messageText(v));
  }

  ngOnInit(): void {
    // this.gameEngineService.state.subscribe((v) => this.state = v);
    this.resetGame();
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
    this.gameEngineService.initialize();
  }

  selectCell(coordinates: Coordinates) {
    this.gameEngineService.makeMove(coordinates);
  }
}
