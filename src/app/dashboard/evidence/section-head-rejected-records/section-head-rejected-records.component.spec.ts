import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionHeadRejectedRecordsComponent } from './section-head-rejected-records.component';

describe('SectionHeadRejectedRecordsComponent', () => {
  let component: SectionHeadRejectedRecordsComponent;
  let fixture: ComponentFixture<SectionHeadRejectedRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionHeadRejectedRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionHeadRejectedRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
