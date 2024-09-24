import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { withNgxsReduxDevtoolsPlugin } from "@ngxs/devtools-plugin";
import { withNgxsLoggerPlugin } from "@ngxs/logger-plugin";
import { provideStore } from "@ngxs/store";
import { GameState } from "./components/game/game.state";
import { provideHttpClient } from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideStore(
      [GameState],
      withNgxsReduxDevtoolsPlugin(),
      withNgxsLoggerPlugin(),
    ),
    provideAnimationsAsync(),
  ],
};
