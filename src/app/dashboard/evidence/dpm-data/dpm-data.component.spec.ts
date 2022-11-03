import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DpmDataComponent } from './dpm-data.component';

describe('DpmDataComponent', () => {
  let component: DpmDataComponent;
  let fixture: ComponentFixture<DpmDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DpmDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DpmDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
