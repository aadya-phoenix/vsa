import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceScoreCategoryComponent } from './evidence-score-category.component';

describe('EvidenceScoreCategoryComponent', () => {
  let component: EvidenceScoreCategoryComponent;
  let fixture: ComponentFixture<EvidenceScoreCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvidenceScoreCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidenceScoreCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
