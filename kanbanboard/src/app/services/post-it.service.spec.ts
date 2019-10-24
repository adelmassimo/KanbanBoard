import { TestBed } from '@angular/core/testing';

import { PostItService } from './post-it.service';

describe('PostItService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostItService = TestBed.get(PostItService);
    expect(service).toBeTruthy();
  });
});
