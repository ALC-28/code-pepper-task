import { Component } from "@angular/core";
import { GameCounterComponent } from "./game-counter/game-counter.component";
import { MatButtonModule } from "@angular/material/button";
import { Store } from "@ngxs/store";
import { GameState, NextRoundAction } from "./game.state";
import { Observable } from "rxjs";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "app-game",
  standalone: true,
  imports: [MatButtonModule, GameCounterComponent, AsyncPipe],
  templateUrl: "./game.component.html",
  styleUrl: "./game.component.scss",
})
export class GameComponent {
  currentRound$: Observable<number>;

  constructor(private store: Store) {
    this.currentRound$ = this.store.select(GameState.getRound);
  }

  startRound(): void {
    this.store.dispatch(new NextRoundAction());
  }
}
