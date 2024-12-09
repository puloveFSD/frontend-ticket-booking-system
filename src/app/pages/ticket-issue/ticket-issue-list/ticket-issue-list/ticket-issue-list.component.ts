import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TripService } from '../../../../service/trip.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketIssue } from '../../../../models/ticket-issue';
import { CommonModule } from '@angular/common';
import { TicketIssueService } from '../../../../service/ticket-issue.service';
import { Trip } from '../../../../models/trip';
import { error } from 'console';

@Component({
  selector: 'app-ticket-issue-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './ticket-issue-list.component.html',
  styleUrl: './ticket-issue-list.component.css'
})
export class TicketIssueListComponent implements OnInit {


  selectedTrip: any;
  ticketForm: FormGroup;




  constructor(private formBuilder: FormBuilder,
    private tripService: TripService,
    // private ticketIssue:TicketIssue,
    private ticketIssueSerice: TicketIssueService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.ticketForm = this.formBuilder.group({
     
      numberofPassengerDto: [''],
      pickUpLocationDto: [''],
      issuedDateDto: new FormControl(new Date().toISOString().split('T')[0]),
      issuedByIdDto: [1],
      contactPersonDto: [''],
      totalAmountDto: [500],
      contactPersonPhoneNumberDto: [''],
      busIdDto: [''],
      tripIdDto: [''],
      seatList: [[]]
    });

    //get the tripId from route
    const tripId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.ticketForm.get('tripIdDto')?.setValue(tripId);

    //fetch trip details
    if (tripId) {
      this.tripService.getTripById(tripId).subscribe({
        next: (trip: Trip) => {
          this.selectedTrip = trip
       

          //set BusId in the form
          if (trip && trip.busIdDto) {
            this.ticketForm.get('busIdDto')?.setValue(trip.busIdDto);

            //this.ticketForm.get('busIdDto')?.setValue(trip.busIdDto);
          }

        }, error: (err) => console.error('Error fetching trip details', err)

      });
    }
  }

  updateSeatList(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    const seatNumber = input
      .split(',')
      .map(s => parseInt(s.trim(), 10))
      .filter(n => !isNaN(n));
    this.ticketForm.get('seatList')?.setValue(seatNumber);
  }
  saveTicketIssue() {
    const ticketDetails = this.ticketForm.value;

     this.ticketIssueSerice.save(ticketDetails).subscribe({
       next: (ticketIssue: TicketIssue) => {
         alert('saved');

       }
     })
  }


}
