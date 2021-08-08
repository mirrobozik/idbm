import { TestBed } from '@angular/core/testing';

import { IdbmService } from './idbm.service';

describe('IdbmService', () => {
  let service: IdbmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdbmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
