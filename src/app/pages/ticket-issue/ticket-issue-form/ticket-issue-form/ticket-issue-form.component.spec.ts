import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketIssueFormComponent } from './ticket-issue-form.component';

describe('TicketIssueFormComponent', () => {
  let component: TicketIssueFormComponent;
  let fixture: ComponentFixture<TicketIssueFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketIssueFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketIssueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
