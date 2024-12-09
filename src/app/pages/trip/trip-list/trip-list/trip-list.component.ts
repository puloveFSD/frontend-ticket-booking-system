import { CommonModule } from '@angular/common';
import { Component, numberAttribute, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TripService } from '../../../../service/trip.service';
import { Trip } from '../../../../models/trip';
import { Bus } from '../../../../models/bus';
import { Location } from '../../../../models/location';
import { BusService } from '../../../../service/bus.service';
import { LocationService } from '../../../../service/location.service';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './trip-list.component.html',
  styleUrl: './trip-list.component.css'
})
export class TripListComponent implements OnInit {


  tripList: Trip[] = [];
  locationList: Location[] = [];
  busList: Bus[] = [];

  constructor(private tripService: TripService,
    private busService: BusService,
    private locationService: LocationService
  ) { }

  ngOnInit(): void {
    this.getTripList();

    //fetch data of bus and location and load in drop down
    this.busService.getBusList().subscribe((busData: Bus[]) => {
      this.busList = busData;

    });

    this.locationService.getLocationList().subscribe((locationData: Location[]) => {
      this.locationList = locationData;
    });

  }
  getTripList(): void {
    this.tripService.getTripList().subscribe((tripList: Trip[]) => {
      this.tripList = tripList;
    });
  }
  deleteTrip(tripId: number): void {
    this.tripService.deleteTrip(tripId).subscribe((result: string) => {
      if (result === 'deleted') {
        alert('Trip record is deleted');
        this.getTripList();
      }
    })
  }
}
