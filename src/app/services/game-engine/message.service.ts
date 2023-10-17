import { Injectable } from '@angular/core';
import {GameState} from "./game-state";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  showMessage(text: string): void {
    setTimeout(() => alert(text), 0)
    };

  constructor() { }
}
