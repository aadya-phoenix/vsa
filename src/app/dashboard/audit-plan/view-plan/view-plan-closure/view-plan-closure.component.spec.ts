import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPlanClosureComponent } from './view-plan-closure.component';

describe('ViewPlanClosureComponent', () => {
  let component: ViewPlanClosureComponent;
  let fixture: ComponentFixture<ViewPlanClosureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPlanClosureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPlanClosureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
