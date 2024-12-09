import { TestBed } from '@angular/core/testing';

import { TicketIssueService } from './ticket-issue.service';

describe('TicketIssueService', () => {
  let service: TicketIssueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketIssueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
