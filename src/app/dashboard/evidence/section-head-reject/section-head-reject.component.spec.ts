import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionHeadRejectComponent } from './section-head-reject.component';

describe('SectionHeadRejectComponent', () => {
  let component: SectionHeadRejectComponent;
  let fixture: ComponentFixture<SectionHeadRejectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionHeadRejectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionHeadRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
