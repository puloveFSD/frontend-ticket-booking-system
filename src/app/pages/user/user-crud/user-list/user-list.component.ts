import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../../../models/user';
import { UserService } from '../../../../service/user.service';

@Component({
  selector: 'app-user-crud',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  userList: User[] = [];
  constructor(private userService: UserService) { }


  ngOnInit(): void {
    this.getUserList();
  }
  getUserList(): void {
    this.userService.getUserList().subscribe((userList: User[]) => {
      this.userList = userList;
    })
  }
  deleteUser(userId:number):void{
    this.userService.deleteUser(userId).subscribe((reply:string)=>{
      if(reply==='deleted'){
        alert('User Record Deleted')
        this.getUserList();
      }
    })

  }
}
