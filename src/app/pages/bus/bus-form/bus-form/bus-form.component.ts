import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BusService } from '../../../../service/bus.service';
import { error } from 'console';
import { Bus } from '../../../../models/bus';
import { User } from '../../../../models/user';

@Component({
  selector: 'app-bus-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './bus-form.component.html',
  styleUrl: './bus-form.component.css'
})
export class BusFormComponent implements OnInit {

  busForm: FormGroup;
  busIdForEdit: number;

  constructor(private formBuilder: FormBuilder,
    private busService: BusService,
    private route: ActivatedRoute,
    private router: Router) { }



  ngOnInit(): void {
    this.busForm = this.formBuilder.group({

      busOperatorNameDto: [''],
      busNumberDto: [''],
      busTypeDto: [''],
      busTotalSeatsDto: ['']
    });
    this.busIdForEdit = parseInt(this.route.snapshot.paramMap.get('id'));
    if (this.busIdForEdit) {
      this.busService.getBusById(this.busIdForEdit).subscribe((busRecord: Bus) => {
        this.busForm.patchValue(busRecord);
      })
    }
  }
  saveBus() {

    const newBusDetails = this.busForm.value;
    // alert(JSON.stringify(newBusDetails));
    if (this.busIdForEdit) {
      this.busService.updateBus(this.busIdForEdit, newBusDetails).subscribe((result: string) => {
        this.router.navigate(['bus-list'])
      })

    } else {
      this.busService.saveBus(newBusDetails).subscribe({
        next: (bus: Bus) => {
          alert("saved")
          this.busForm.reset();
          this.router.navigate(['bus-list'])
        }, error: (error) => {
          alert("Error ocured");
          console.error("Error", error);

        }
      })
    }
  }
}
