import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "game",
    loadComponent: () =>
      import("./components/game/game.component").then((c) => c.GameComponent),
  },
  {
    path: "**",
    redirectTo: "/game",
  },
];
