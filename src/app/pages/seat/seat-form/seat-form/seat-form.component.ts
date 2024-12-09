import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SeatService } from '../../../../service/seat.service';
import { Bus } from '../../../../models/bus';
import { BusService } from '../../../../service/bus.service';
import { CommonModule } from '@angular/common';
import { Seat } from '../../../../models/seat';
import { error } from 'console';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-seat-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './seat-form.component.html',
  styleUrl: './seat-form.component.css'
})
export class SeatFormComponent implements OnInit {

  seatForm: FormGroup;
  busList: Bus[] = [];


  constructor(private formBuilder: FormBuilder,
    private seatService: SeatService,
    private busService: BusService,
    private router:Router

  ) { }
  ngOnInit(): void {
    this.seatForm = this.formBuilder.group({
      seatNumberDto: [''],
      busIdDto: ['']
    });

    //fetch bus details 
    this.busService.getBusList().subscribe((busData: Bus[]) => {
      this.busList = busData;
    })
  }

  saveSeat() {
    const seatDetails = this.seatForm.value;
    alert(JSON.stringify(seatDetails));

   this.seatService.saveSeat(seatDetails).subscribe({
    next:(seat:Seat)=>{
      alert("save")
      this.seatForm.reset();
      this.router.navigate(['seat-list'])
    },error:(error)=>{
      alert("Error occured");
      console.error("Error",error);
    }
   })

  }


}
