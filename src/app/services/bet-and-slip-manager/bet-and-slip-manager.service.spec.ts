import { TestBed } from '@angular/core/testing';

import { BetAndSlipManagerService } from './bet-and-slip-manager.service';

describe('BetAndSlipManagerService', () => {
  let service: BetAndSlipManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BetAndSlipManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
