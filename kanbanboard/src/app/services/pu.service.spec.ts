import { TestBed } from '@angular/core/testing';

import { PuService } from './pu.service';

describe('PuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PuService = TestBed.get(PuService);
    expect(service).toBeTruthy();
  });
});
