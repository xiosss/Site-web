import { TestBed } from '@angular/core/testing';

import { ListproductService } from './listproduct.service';

describe('ListproductService', () => {
  let service: ListproductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListproductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
