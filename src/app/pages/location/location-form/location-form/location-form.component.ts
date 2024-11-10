import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationService } from '../../../../service/location.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Location } from '../../../../models/location';
import e from 'express';
import { error } from 'console';

@Component({
  selector: 'app-location-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './location-form.component.html',
  styleUrl: './location-form.component.css'
})
export class LocationFormComponent implements OnInit {

  locationForm: FormGroup;
  locationIdForEdit: number;
  constructor(
    private formBuilder: FormBuilder,
    private locationSevice: LocationService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.locationForm = this.formBuilder.group({
      locationNameDto: ['']
    });
    this.locationIdForEdit = parseInt(this.route.snapshot.paramMap.get('id'));
    if (this.locationIdForEdit) {
      this.locationSevice.getLocationById(this.locationIdForEdit).subscribe((locationRecordFromDataBase: Location) => {
        this.locationForm.patchValue(locationRecordFromDataBase);
      })
    }
  }
  saveLocation() {
    const locationDetails = this.locationForm.value;
    if (this.locationIdForEdit) {
      this.locationSevice.updateLocation(this.locationIdForEdit, locationDetails).subscribe((result: string) => {
        this.router.navigate(['location-list'])
      })
    } else {
      this.locationSevice.saveLocation(locationDetails).subscribe({
        next: (location: Location) => {
          alert("Saved")
          this.locationForm.reset();
          this.router.navigate(['location-list'])
        }, error: (error) => {
          alert("Error ");
          console.error("Error", error);

        }
      })
    }

  }

}
