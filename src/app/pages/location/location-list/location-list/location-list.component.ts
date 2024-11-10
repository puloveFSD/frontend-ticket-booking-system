import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '../../../../models/location';
import { LocationService } from '../../../../service/location.service';

@Component({
  selector: 'app-location-list',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './location-list.component.html',
  styleUrl: './location-list.component.css'
})
export class LocationListComponent implements OnInit{
  locationList:Location[]=[];

  constructor(private locationService:LocationService){}
  ngOnInit(): void {
   this.getLocationList();
  }
  getLocationList():void{
    this.locationService.getLocationList().subscribe((locationList:Location[])=>{
      this.locationList=locationList;
    });
  }
  deleteLocation(locationId:number):void{
    this.locationService.deleteLocation(locationId).subscribe((result:string)=>{
      if(result==="deleted"){
        alert('Location Record Deleted');
        this.getLocationList();
      }

    })
  }


}
