import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";

const stateName = "[App]";

export interface AppStateModel {
  loading: boolean;
}

export class SetLoaderAction {
  static readonly type = `${stateName} Set loader`;
  constructor(public payload: boolean) {}
}

@State<AppStateModel>({
  name: "app",
  defaults: {
    loading: false,
  },
})
@Injectable()
export class AppState {
  @Selector()
  static getLoader(state: AppStateModel): boolean {
    return state.loading;
  }

  @Action(SetLoaderAction)
  setLoader(ctx: StateContext<AppStateModel>, action: SetLoaderAction) {
    ctx.patchState({
      loading: action.payload,
    });
  }
}
