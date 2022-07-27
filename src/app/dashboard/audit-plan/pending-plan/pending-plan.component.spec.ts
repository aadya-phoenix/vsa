import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingPlanComponent } from './pending-plan.component';

describe('PendingPlanComponent', () => {
  let component: PendingPlanComponent;
  let fixture: ComponentFixture<PendingPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
