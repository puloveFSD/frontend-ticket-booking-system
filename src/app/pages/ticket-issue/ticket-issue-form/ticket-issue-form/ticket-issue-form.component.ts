import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TicketIssueService } from '../../../../service/ticket-issue.service';
import { Bus } from '../../../../models/bus';
import { BusService } from '../../../../service/bus.service';
import { LocationService } from '../../../../service/location.service';
import { Location } from '../../../../models/location';
import { Trip } from '../../../../models/trip';
import { TripService } from '../../../../service/trip.service';
import { start } from 'repl';
import { TicketIssueListComponent } from '../../ticket-issue-list/ticket-issue-list/ticket-issue-list.component';
import { TicketIssue } from '../../../../models/ticket-issue';

@Component({
  selector: 'app-ticket-issue-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink, CommonModule, TicketIssueListComponent],
  templateUrl: './ticket-issue-form.component.html',
  styleUrl: './ticket-issue-form.component.css'
})
export class TicketIssueFormComponent implements OnInit {

  ticketIssueForm: FormGroup;
  busList: Bus[] = [];
  locationList: Location[] = [];
  tripList: Trip[] = [];
  tripRecords: TicketIssue[] = [];
  filteredTrips = [];



  constructor(private formBuilder: FormBuilder,
    private ticketIssueService: TicketIssueService,
    private locationService: LocationService,
    private busService: BusService,
    private tripService: TripService,
    private ticketService: TicketIssueService,
   

  ) { }
  ngOnInit(): void {
    this.ticketIssueForm = this.formBuilder.group({
      start: [''],
      destination: ['']

    });
    this.filteredTrips = [this.tripList];

    //fetch data of bus 
    this.busService.getBusList().subscribe((busData: Bus[]) => {
      this.busList = busData;
    });

    //fetch location data
    this.locationService.getLocationList().subscribe((locationData: Location[]) => {
      this.locationList = locationData;
    });
    //fetch trip data
    this.tripService.getTripList().subscribe((tripData: Trip[]) => {
      this.tripList = tripData;
    });
  }

  filterTrips() {
    const start = this.ticketIssueForm.get('start')?.value;
    const destination = this.ticketIssueForm.get('destination')?.value;

    this.filteredTrips = this.tripList.filter(
      trip => (!start || trip.startLocationDtoId === +start) && (!destination || trip.destinationDtoId === +destination)
    );
  }


  // getTripsByLocation(): void {
  //   const start = 1;
  //   const destination = 1;
  //   this.ticketService.getTripsByLocation(start, destination).subscribe({
  //     next: (record) => (this.tripRecords = record),
  //     error: (err) => console.error('Error fetching trip records', err)

  //   });

  // }

  getLocationName(locationId: number): string {
    const location = this.locationList.find(loc => loc.locationMasterIdDto === locationId);
    return location ? location.locationNameDto : 'Unknown';
  }

  getBusName(busIdDto: number): string {
    const busName = this.busList.find(bus => bus.busIdDto === busIdDto);
    return busName ? busName.busNumberDto : 'unknown';
  }
}
