import { TestBed } from "@angular/core/testing";
import { provideStore, Store } from "@ngxs/store";
import { GameState, NextRoundAction, UpdateScoreAction } from "./game.state";

describe("GameState", () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore([GameState])],
    });

    store = TestBed.inject(Store);
    store.reset({
      ...store.snapshot(),
      game: {
        cards: [],
        round: 0,
        score: [],
      },
    });
  });

  it("should start new round", () => {
    store.dispatch(new NextRoundAction());
    const round = store.selectSnapshot(GameState.getRound);
    expect(round).toBe(1);
  });

  it("should update the score", () => {
    store.dispatch(new UpdateScoreAction([1, 0]));
    const score = store.selectSnapshot(GameState.getScore);
    expect(score).toEqual([1, 0]);
  });
});
