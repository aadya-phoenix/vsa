import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPlanReceiveComponent } from './action-plan-receive.component';

describe('ActionPlanReceiveComponent', () => {
  let component: ActionPlanReceiveComponent;
  let fixture: ComponentFixture<ActionPlanReceiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionPlanReceiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionPlanReceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
