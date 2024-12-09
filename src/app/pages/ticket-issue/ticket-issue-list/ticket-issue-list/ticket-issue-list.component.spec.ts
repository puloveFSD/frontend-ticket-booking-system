import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketIssueListComponent } from './ticket-issue-list.component';

describe('TicketIssueListComponent', () => {
  let component: TicketIssueListComponent;
  let fixture: ComponentFixture<TicketIssueListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketIssueListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketIssueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
