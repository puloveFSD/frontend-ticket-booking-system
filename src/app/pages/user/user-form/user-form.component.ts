import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { User } from '../../../models/user';
import { error } from 'console';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {

  userRegisterForm: FormGroup;
  userIdForEdit: number;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private route:ActivatedRoute,
    private router: Router) { }
  ngOnInit(): void {
    this.userRegisterForm = this.formBuilder.group({
      usernameDto: [''],
      passwordDto: [''],
      userRole: [''],
      userFullNameDto: [''],
      userPhoneNumberDto: [''],
      userAddressDto: [''],
      userEmailDto: ['']

    });
    this.userIdForEdit=parseInt(this.route.snapshot.paramMap.get('id'));
    if(this.userIdForEdit){
      this.userService.getUserById(this.userIdForEdit).subscribe((userRecord:User)=>{
        this.userRegisterForm.patchValue(userRecord);
      })
    }
  }
  saveUser() {
    const newUserValue = this.userRegisterForm.value;
    if (this.userIdForEdit) {
      this.userService.updateUser(this.userIdForEdit, newUserValue).subscribe((result: string) => {
        this.router.navigate(['user-list'])
      })
    } else {
      this.userService.saveUser(newUserValue).subscribe({
        next: (user: User) => {
          alert("Saved")
          this.userRegisterForm.reset();
          this.router.navigate(['user-list'])
        }, error: (error) => {
          alert("Error occured");
          console.error("ERROR", error);
    
        }
      })

    }
  }
}
