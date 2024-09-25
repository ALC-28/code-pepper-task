import { Component } from "@angular/core";
import { GameCounterComponent } from "./game-counter/game-counter.component";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { Store } from "@ngxs/store";
import {
  ChangeResourceTypeAction,
  GameState,
  NextRoundAction,
} from "./game.state";
import { Observable } from "rxjs";
import { AsyncPipe, JsonPipe, KeyValuePipe } from "@angular/common";
import { ResourceType } from "./game.constants";
import {
  PeoplePropertiesMapped,
  StarhipsPropertiesMapped,
} from "../../services/card.interface";

@Component({
  selector: "app-game",
  standalone: true,
  imports: [
    MatButtonModule,
    GameCounterComponent,
    AsyncPipe,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    JsonPipe,
    KeyValuePipe,
  ],
  templateUrl: "./game.component.html",
  styleUrl: "./game.component.scss",
})
export class GameComponent {
  currentRound$: Observable<number>;
  resourceTypes: string[];
  currentResourceType$: Observable<ResourceType>;
  cards$: Observable<(PeoplePropertiesMapped & StarhipsPropertiesMapped)[]>;
  currentScore$: Observable<number[]>;

  constructor(private store: Store) {
    this.resourceTypes = Object.values(ResourceType);
    this.currentResourceType$ = this.store.select(GameState.getResourceType);
    this.currentRound$ = this.store.select(GameState.getRound);
    this.cards$ = this.store.select(GameState.getCards);
    this.currentScore$ = this.store.select(GameState.getScore);
  }

  changeResourceType(resourceType: ResourceType): void {
    this.store.dispatch(new ChangeResourceTypeAction(resourceType));
  }

  startRound(): void {
    this.store.dispatch(new NextRoundAction());
  }
}
