import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeRepeatComponent } from './trade-repeat.component';

describe('TradeRepeatComponent', () => {
  let component: TradeRepeatComponent;
  let fixture: ComponentFixture<TradeRepeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeRepeatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeRepeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
