import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GameCounterComponent } from "./game-counter.component";

describe("GameCounterComponent", () => {
  let component: GameCounterComponent;
  let fixture: ComponentFixture<GameCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameCounterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });
});
