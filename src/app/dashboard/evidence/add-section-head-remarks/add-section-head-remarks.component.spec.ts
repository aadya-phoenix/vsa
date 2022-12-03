import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSectionHeadRemarksComponent } from './add-section-head-remarks.component';

describe('AddSectionHeadRemarksComponent', () => {
  let component: AddSectionHeadRemarksComponent;
  let fixture: ComponentFixture<AddSectionHeadRemarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSectionHeadRemarksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSectionHeadRemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
