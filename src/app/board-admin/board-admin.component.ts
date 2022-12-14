import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AdminService } from '../_services/admin.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})

export class BoardAdminComponent implements OnInit {
  content?: string;

  //User array to store list of users
  public users: User[];


  constructor(private userService: UserService, private adminService: AdminService) { }

  //Get Admin board only for 'ADMIN' role
  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        console.log(err)
        if (err.error) {
          this.content = JSON.parse(err.error).message;
        } else {
          this.content = "Error with status: " + err.status;
        }
      }
    });
    this.getUsers();
  }

  /**
   * Method to get all users and store them in an array to be able to display to Administrator
   */
  public getUsers() {
    this.adminService.getAllUsers().subscribe(
      (response: User[]) => {
        this.users = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}