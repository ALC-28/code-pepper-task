import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Card } from "./game.interface";
import { ResourceType } from "./game.constants";

const stateName = "[Game]";

export interface GameStateModel {
  cards: Card[];
  round: number;
  resourceType: ResourceType;
  score: number[];
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
    score: [],
  },
})
@Injectable()
export class GameState {
  @Selector()
  static getCards(state: GameStateModel): Card[] {
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

  constructor() {}

  @Action(NextRoundAction)
  startNextRound(ctx: StateContext<GameStateModel>) {
    // TODO: fetch cards
    const state = ctx.getState();
    ctx.patchState({
      round: state.round + 1,
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
