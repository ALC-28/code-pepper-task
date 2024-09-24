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
import { AsyncPipe, JsonPipe } from "@angular/common";
import { ResourceType } from "./game.constants";
import {
  PeopleProperties,
  StarhipsProperties,
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
  ],
  templateUrl: "./game.component.html",
  styleUrl: "./game.component.scss",
})
export class GameComponent {
  currentRound$: Observable<number>;
  resourceTypes: string[];
  currentResourceType$: Observable<ResourceType>;
  cards$: Observable<(PeopleProperties | StarhipsProperties)[]>;

  constructor(private store: Store) {
    this.resourceTypes = Object.values(ResourceType);
    this.currentResourceType$ = this.store.select(GameState.getResourceType);
    this.currentRound$ = this.store.select(GameState.getRound);
    this.cards$ = this.store.select(GameState.getCards);
  }

  changeResourceType(resourceType: ResourceType): void {
    this.store.dispatch(new ChangeResourceTypeAction(resourceType));
  }

  startRound(): void {
    this.store.dispatch(new NextRoundAction());
  }
}
