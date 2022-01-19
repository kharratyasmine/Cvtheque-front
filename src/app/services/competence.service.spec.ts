import { TestBed } from '@angular/core/testing';

import { CompetenceService } from './competence.service';

describe('CompetanceService', () => {
  let service: CompetenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompetenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
