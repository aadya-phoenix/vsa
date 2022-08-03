import { TestBed } from '@angular/core/testing';

import { RegulationMasterService } from './regulation-master.service';

describe('RegulationMasterService', () => {
  let service: RegulationMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegulationMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
