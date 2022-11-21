import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPlanVendorComponent } from './action-plan-vendor.component';

describe('ActionPlanVendorComponent', () => {
  let component: ActionPlanVendorComponent;
  let fixture: ComponentFixture<ActionPlanVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionPlanVendorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionPlanVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
