import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPlanComponent } from './upload-plan.component';

describe('UploadPlanComponent', () => {
  let component: UploadPlanComponent;
  let fixture: ComponentFixture<UploadPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
