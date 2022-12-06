import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAuditLogComponent } from './manage-audit-log.component';

describe('ManageAuditLogComponent', () => {
  let component: ManageAuditLogComponent;
  let fixture: ComponentFixture<ManageAuditLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAuditLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAuditLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
