import { Component } from "@angular/core";
import { GameCounterComponent } from "./game-counter/game-counter.component";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { Store } from "@ngxs/store";
import {
  ChangeResourceTypeAction,
  GameState,
  NextRoundAction,
} from "./game.state";
import { Observable } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { ResourceType } from "./game.constants";

@Component({
  selector: "app-game",
  standalone: true,
  imports: [
    MatButtonModule,
    GameCounterComponent,
    AsyncPipe,
    MatButtonToggleModule,
  ],
  templateUrl: "./game.component.html",
  styleUrl: "./game.component.scss",
})
export class GameComponent {
  currentRound$: Observable<number>;
  resourceTypes: string[];
  currentResourceType$: Observable<ResourceType>;

  constructor(private store: Store) {
    this.resourceTypes = Object.values(ResourceType);
    this.currentResourceType$ = this.store.select(GameState.getResourceType);
    this.currentRound$ = this.store.select(GameState.getRound);
  }

  changeResourceType(resourceType: ResourceType): void {
    this.store.dispatch(new ChangeResourceTypeAction(resourceType));
  }

  startRound(): void {
    this.store.dispatch(new NextRoundAction());
  }
}
