import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { LoaderComponent } from "./components/common/loader/loader.component";
import { AsyncPipe } from "@angular/common";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { AppState } from "./app.state";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, LoaderComponent, AsyncPipe],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  loading$: Observable<boolean>;

  constructor(private store: Store) {
    this.loading$ = this.store.select(AppState.getLoader);
  }
}
