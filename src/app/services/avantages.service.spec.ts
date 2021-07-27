import { TestBed } from '@angular/core/testing';

import { AvantagesService } from './avantages.service';

describe('AvantagesService', () => {
  let service: AvantagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvantagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
