import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingActionPlanComponent } from './pending-action-plan.component';

describe('PendingActionPlanComponent', () => {
  let component: PendingActionPlanComponent;
  let fixture: ComponentFixture<PendingActionPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingActionPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingActionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
