import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SingleCellComponent } from './components/sigle-cell/single-cell.component';
import { BoardComponent } from './components/board/board.component';
import {GameEngineService} from "./services/game-engine/game-engine.service";
import {PlayerTurn} from "./services/game-engine/player-turn";
import {ComputerPlayerService} from "./services/player-service/computer-player.service";

@NgModule({
  declarations: [
    AppComponent,
    SingleCellComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
