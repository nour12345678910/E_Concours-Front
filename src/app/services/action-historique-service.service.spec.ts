import { TestBed } from '@angular/core/testing';

import { ActionHistoriqueServiceService } from './action-historique-service.service';

describe('ActionHistoriqueServiceService', () => {
  let service: ActionHistoriqueServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionHistoriqueServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
