import { TestBed } from '@angular/core/testing';

import { LoadSportsGuard } from './load-sports.guard';

describe('LoadSportsLoadSportsGuard', () => {
  let guard: LoadSportsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoadSportsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
