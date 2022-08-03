import { TestBed } from '@angular/core/testing';

import { AuditAreaMasterService } from './audit-area-master.service';

describe('AuditAreaMasterService', () => {
  let service: AuditAreaMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuditAreaMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
