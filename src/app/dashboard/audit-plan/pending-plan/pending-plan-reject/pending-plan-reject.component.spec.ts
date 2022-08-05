import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingPlanRejectComponent } from './pending-plan-reject.component';

describe('PendingPlanRejectComponent', () => {
  let component: PendingPlanRejectComponent;
  let fixture: ComponentFixture<PendingPlanRejectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingPlanRejectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingPlanRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
