import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TripService } from '../../../../service/trip.service';
import { Trip } from '../../../../models/trip';
import { LocationService } from '../../../../service/location.service';
import { Bus } from '../../../../models/bus';
import { Location } from '../../../../models/location';
import { BusService } from '../../../../service/bus.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink,CommonModule],
  templateUrl: './trip-form.component.html',
  styleUrl: './trip-form.component.css'
})
export class TripFormComponent implements OnInit {


  tripForm: FormGroup;
  tripIdForEdit: number;

  locationList: Location[] = [];
  busList: Bus[] = [];


  constructor(private formBuilder: FormBuilder,
    private tripService: TripService,
    private locationService: LocationService,
    private busService: BusService,
    private router: Router,
    private route: ActivatedRoute) { }


  ngOnInit(): void {

    this.tripForm = this.formBuilder.group({
      tripDateDto: [''],
      tripDepartureTimeDto: [''],
      tripArrivalTimeDto: [''],
      startLocationDtoId: [''],
      destinationDtoId: [''],
      busIdDto: ['']
    });

    //fetch data of bus and location and load in drop down
    this.busService.getBusList().subscribe((busData: Bus[]) => {
      this.busList = busData;
     
    });

    this.locationService.getLocationList().subscribe((locationData: Location[]) => {
      this.locationList = locationData;
    })



    this.tripIdForEdit = parseInt(this.route.snapshot.paramMap.get('id'));
    if (this.tripIdForEdit) {
      this.tripService.getTripById(this.tripIdForEdit).subscribe((tripRecordFromDatabase: Trip) => {
        this.tripForm.patchValue(tripRecordFromDatabase);
      })
    }
  }


  saveTrip() {
    const newTripDetails = this.tripForm.value;
    if (this.tripIdForEdit) {
      this.tripService.updateTrip(this.tripIdForEdit, newTripDetails).subscribe((result: string) => {
        this.router.navigate(['trip-list']);
      })
    } else {
      this.tripService.saveTrip(newTripDetails).subscribe({
        next: (trip: Trip) => {
          alert("saved")
          this.tripForm.reset();
          this.router.navigate(['trip-list'])
        }, error: (error) => {
          alert("Error occured");
          console.error("Error", error);
        }
      })
    }
  }
}
