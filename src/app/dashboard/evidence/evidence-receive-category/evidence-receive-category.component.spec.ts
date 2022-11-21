import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceReceiveCategoryComponent } from './evidence-receive-category.component';

describe('EvidenceReceiveCategoryComponent', () => {
  let component: EvidenceReceiveCategoryComponent;
  let fixture: ComponentFixture<EvidenceReceiveCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvidenceReceiveCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidenceReceiveCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
