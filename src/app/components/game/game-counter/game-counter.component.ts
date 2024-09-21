import { Component, Input } from "@angular/core";

@Component({
  selector: "app-game-counter",
  standalone: true,
  imports: [],
  templateUrl: "./game-counter.component.html",
  styleUrl: "./game-counter.component.scss",
})
export class GameCounterComponent {
  @Input()
  round!: number | null;
  @Input()
  score!: number[] | null;
}
