import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditAreaEditComponent } from './audit-area-edit.component';

describe('AuditAreaEditComponent', () => {
  let component: AuditAreaEditComponent;
  let fixture: ComponentFixture<AuditAreaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditAreaEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditAreaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
