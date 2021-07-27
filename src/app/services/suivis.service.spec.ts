import { TestBed } from '@angular/core/testing';

import { SuivisService } from './suivis.service';

describe('SuivisService', () => {
  let service: SuivisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuivisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
