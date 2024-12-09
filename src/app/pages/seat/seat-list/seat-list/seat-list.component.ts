import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seat } from '../../../../models/seat';
import { SeatService } from '../../../../service/seat.service';
import { BusService } from '../../../../service/bus.service';
import { Bus } from '../../../../models/bus';

@Component({
  selector: 'app-seat-list',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './seat-list.component.html',
  styleUrl: './seat-list.component.css'
})
export class SeatListComponent implements OnInit{
  seatList:Seat[]=[];
  busName:string;
  
constructor(private seatService:SeatService,
  private busService:BusService
){}
  ngOnInit(): void {
  this.getSeatList();
  }

  getSeatList():void{
    this.seatService.getSeat().subscribe((seatList:Seat[])=>{
      this.seatList=seatList;
    })
  }
  getBusById(id:number):any{
    this.busService.getBusById(id).subscribe((bus:Bus)=>{
      this.busName=bus.busNumberDto;
    })
  }

}
