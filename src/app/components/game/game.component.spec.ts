import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GameComponent } from "./game.component";
import { provideStore } from "@ngxs/store";
import { GameState } from "./game.state";
import { provideHttpClient } from "@angular/common/http";

describe("GameComponent", () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameComponent],
      providers: [provideStore([GameState]), provideHttpClient()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });
});
