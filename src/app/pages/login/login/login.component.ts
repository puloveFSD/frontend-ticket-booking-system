import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { User } from '../../../models/user';
import { RouterLink, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { error } from 'console';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.loginForm = this.formBuilder.group({
      usernameDto: [''],
      passwordDto: [''],


      // userRoleDto: ['']
    })
  }
  login(): void {
    const userValue = this.loginForm.value;

    this.userService.login(userValue).subscribe({
      next: (user: User) => {
        
          //alert('successful')
          this.router.navigate(['app'])
        } ,error:(error)=>{
          alert("Error occured")
        }
     
    })

  }
}
