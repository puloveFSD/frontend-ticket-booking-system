import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BusService } from '../../../../service/bus.service';
import { Bus } from '../../../../models/bus';

@Component({
  selector: 'app-bus-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './bus-list.component.html',
  styleUrl: './bus-list.component.css'
})
export class BusListComponent implements OnInit {

  busList: Bus[] = [];
  constructor(private busService: BusService) { }

  ngOnInit(): void {
    this.getBusList();
  }
  getBusList(): void {
    this.busService.getBusList().subscribe((busList: Bus[]) => {
      this.busList = busList;
    })
  }
  deleteBus(id:number):void{
    this.busService.deleteBus(id).subscribe((result:string)=>{
      if(result==='Deleted'){
        alert('Bus REcord Deleted')
        this.getBusList();
      }
    })
  }
  

}
