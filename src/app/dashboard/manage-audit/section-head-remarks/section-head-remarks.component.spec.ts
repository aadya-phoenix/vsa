import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionHeadRemarksComponent } from './section-head-remarks.component';

describe('SectionHeadRemarksComponent', () => {
  let component: SectionHeadRemarksComponent;
  let fixture: ComponentFixture<SectionHeadRemarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionHeadRemarksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionHeadRemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
