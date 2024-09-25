import { TestBed } from "@angular/core/testing";
import { provideStore, Store } from "@ngxs/store";
import { AppState, SetLoaderAction } from "./app.state";

describe("AppState", () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore([AppState])],
    });

    store = TestBed.inject(Store);
    store.reset({
      app: {
        loading: false,
      },
    });
  });

  it("should set the loader", () => {
    store.dispatch(new SetLoaderAction(true));
    const loading = store.selectSnapshot(AppState.getLoader);
    expect(loading).toBe(true);
  });
});
