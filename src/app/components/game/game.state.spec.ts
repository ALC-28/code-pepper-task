import { TestBed } from "@angular/core/testing";
import { provideStore, Store } from "@ngxs/store";
import {
  ChangeResourceTypeAction,
  GameState,
  GetAvailableResourcesAction,
  NextRoundAction,
  UpdateScoreAction,
} from "./game.state";
import { ResourceType } from "./game.constants";
import { provideHttpClient } from "@angular/common/http";
import { CardService } from "../../services/card.service";
import { firstValueFrom } from "rxjs";

describe("GameState", () => {
  let store: Store;
  let cardServiceMock: {
    getTotalAvailableResources: jest.Mock;
    getNewRandomCards: jest.Mock;
  };

  beforeEach(() => {
    cardServiceMock = {
      getNewRandomCards: jest.fn(),
      getTotalAvailableResources: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        provideStore([GameState]),
        provideHttpClient(),
        {
          provide: CardService,
          useValue: cardServiceMock,
        },
      ],
    });

    cardServiceMock.getTotalAvailableResources.mockResolvedValue({
      [ResourceType.PEOPLE]: 10,
      [ResourceType.STARSHIPS]: 20,
    });

    store = TestBed.inject(Store);
    store.reset({
      game: {
        cards: [],
        round: 0,
        availableResources: {},
        resourceType: ResourceType.PEOPLE,
        score: [],
      },
    });
  });

  it("should get available resources", async () => {
    const availableResourcesResult = {
      [ResourceType.PEOPLE]: 10,
      [ResourceType.STARSHIPS]: 20,
    };
    await firstValueFrom(store.dispatch(new GetAvailableResourcesAction()));
    const resources = store.selectSnapshot(GameState.getAvailableResources);
    expect(resources).toEqual(availableResourcesResult);
  });

  it("should start new round", async () => {
    cardServiceMock.getNewRandomCards.mockResolvedValue([]);
    await firstValueFrom(store.dispatch(new NextRoundAction()));
    const round = store.selectSnapshot(GameState.getRound);
    expect(round).toBe(1);
  });

  it("should get new cards", async () => {
    const cardsResult = [{ mass: 1 }, { mass: 2 }];
    cardServiceMock.getNewRandomCards.mockResolvedValue(cardsResult);
    await firstValueFrom(store.dispatch(new NextRoundAction()));
    const cards = store.selectSnapshot(GameState.getCards);
    expect(cards).toEqual(cardsResult);
  });

  it("should update the score", () => {
    store.dispatch(new UpdateScoreAction([1, 0]));
    const score = store.selectSnapshot(GameState.getScore);
    expect(score).toEqual([1, 0]);
  });

  it("should change the resource type", () => {
    store.dispatch(new ChangeResourceTypeAction(ResourceType.STARSHIPS));
    const resourceType = store.selectSnapshot(GameState.getResourceType);
    expect(resourceType).toBe(ResourceType.STARSHIPS);
  });
});
