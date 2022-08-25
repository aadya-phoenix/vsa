import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPlanObservationComponent } from './action-plan-observation.component';

describe('ActionPlanObservationComponent', () => {
  let component: ActionPlanObservationComponent;
  let fixture: ComponentFixture<ActionPlanObservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionPlanObservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionPlanObservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
