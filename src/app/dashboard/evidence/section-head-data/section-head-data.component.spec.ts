import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionHeadDataComponent } from './section-head-data.component';

describe('SectionHeadDataComponent', () => {
  let component: SectionHeadDataComponent;
  let fixture: ComponentFixture<SectionHeadDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionHeadDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionHeadDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
