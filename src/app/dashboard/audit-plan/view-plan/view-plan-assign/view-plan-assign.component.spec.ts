import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPlanAssignComponent } from './view-plan-assign.component';

describe('ViewPlanAssignComponent', () => {
  let component: ViewPlanAssignComponent;
  let fixture: ComponentFixture<ViewPlanAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPlanAssignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPlanAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
