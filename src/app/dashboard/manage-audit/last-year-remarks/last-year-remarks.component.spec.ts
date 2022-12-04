import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastYearRemarksComponent } from './last-year-remarks.component';

describe('LastYearRemarksComponent', () => {
  let component: LastYearRemarksComponent;
  let fixture: ComponentFixture<LastYearRemarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastYearRemarksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastYearRemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
