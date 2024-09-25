import { Injectable } from "@angular/core";
import { Action, NgxsOnInit, Selector, State, StateContext } from "@ngxs/store";
import { CommonProperty, ResourceType } from "./game.constants";
import { CardService } from "../../services/card.service";
import {
  PeoplePropertiesMapped,
  StarhipsPropertiesMapped,
} from "../../services/card.interface";

const stateName = "[Game]";

export interface GameStateModel {
  cards: (PeoplePropertiesMapped & StarhipsPropertiesMapped)[];
  round: number;
  resourceType: ResourceType;
  availableResources: { [key: string]: number };
  score: number[];
}

export class GetAvailableResourcesAction {
  static readonly type = `${stateName} Get available resources`;
}

export class NextRoundAction {
  static readonly type = `${stateName} Next round`;
}

export class UpdateScoreAction {
  static readonly type = `${stateName} Update score`;
  constructor(public payload: number[]) {}
}

export class ChangeResourceTypeAction {
  static readonly type = `${stateName} Change resource type`;
  constructor(public payload: ResourceType) {}
}

@State<GameStateModel>({
  name: "game",
  defaults: {
    cards: [],
    round: 0,
    resourceType: ResourceType.PEOPLE,
    availableResources: {},
    score: [],
  },
})
@Injectable()
export class GameState implements NgxsOnInit {
  ngxsOnInit(ctx: StateContext<GameStateModel>) {
    ctx.dispatch(new GetAvailableResourcesAction());
  }

  @Selector()
  static getAvailableResources(state: GameStateModel): {
    [key: string]: number;
  } {
    return state.availableResources;
  }

  @Selector()
  static getCards(
    state: GameStateModel,
  ): (PeoplePropertiesMapped & StarhipsPropertiesMapped)[] {
    return state.cards;
  }

  @Selector()
  static getRound(state: GameStateModel): number {
    return state.round;
  }

  @Selector()
  static getResourceType(state: GameStateModel): ResourceType {
    return state.resourceType;
  }

  @Selector()
  static getScore(state: GameStateModel): number[] {
    return state.score;
  }

  constructor(private cardService: CardService) {}

  @Action(GetAvailableResourcesAction)
  async getAvailableResources(ctx: StateContext<GameStateModel>) {
    const resources = await this.cardService.getTotalAvailableResources(
      Object.values(ResourceType),
    );
    ctx.patchState({
      availableResources: resources,
    });
  }

  @Action(NextRoundAction)
  async startNextRound(ctx: StateContext<GameStateModel>) {
    const state = ctx.getState();
    const cards = await this.cardService.getNewRandomCards(
      state.resourceType,
      state.availableResources[state.resourceType],
    );
    const commonProperty =
      state.resourceType === ResourceType.PEOPLE
        ? CommonProperty.PEOPLE
        : CommonProperty.STARSHIPS;
    ctx.patchState({
      round: state.round + 1,
      cards: cards.map((c) => ({ ...c, commonProperty })),
    });
  }

  @Action(UpdateScoreAction)
  updateScore(ctx: StateContext<GameStateModel>, action: UpdateScoreAction) {
    ctx.patchState({
      score: action.payload,
    });
  }

  @Action(ChangeResourceTypeAction)
  changeResourceType(
    ctx: StateContext<GameStateModel>,
    action: ChangeResourceTypeAction,
  ) {
    ctx.patchState({
      resourceType: action.payload,
    });
  }
}
