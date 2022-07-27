import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingPlanListComponent } from './pending-plan-list.component';

describe('PendingPlanListComponent', () => {
  let component: PendingPlanListComponent;
  let fixture: ComponentFixture<PendingPlanListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingPlanListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingPlanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
