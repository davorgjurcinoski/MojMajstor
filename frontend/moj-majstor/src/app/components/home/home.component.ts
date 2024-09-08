import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../../services/auth.service";
import {SearchUserComponent} from "../search-user/search-user.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  loggedIn = false;

  constructor(private router: Router,
              private authService: AuthService,
              private dialog: MatDialog){

  }

  find(): void {
    this.dialog.open(SearchUserComponent, {
      width: '500px',
      panelClass: 'custom-dialog',
      data: {
        isFriendRequest: true,
        isSuggestion: false,
        suggestion: undefined,
      },
    });
  }

  ngOnInit() {
    this.loggedIn = this.authService.isLoggedIn();

    this.authService.getLoginStatus().subscribe((isLoggedIn) => {
      this.loggedIn = isLoggedIn;
    });
  }

}
