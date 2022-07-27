import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegulationEditComponent } from './regulation-edit.component';

describe('RegulationEditComponent', () => {
  let component: RegulationEditComponent;
  let fixture: ComponentFixture<RegulationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegulationEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegulationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
