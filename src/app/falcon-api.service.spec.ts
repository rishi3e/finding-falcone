import { TestBed } from '@angular/core/testing';

import { FalconAPIService } from './falcon-api.service';

describe('FalconAPIService', () => {
  let service: FalconAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FalconAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
