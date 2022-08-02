import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAuditListComponent } from './manage-audit-list.component';

describe('ManageAuditListComponent', () => {
  let component: ManageAuditListComponent;
  let fixture: ComponentFixture<ManageAuditListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAuditListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAuditListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
