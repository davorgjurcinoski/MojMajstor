import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  loggedIn = false;

  constructor(private router: Router,
              private authService: AuthService){

  }

  find(){
    this.router.navigate(['search'])
  }

  ngOnInit() {
    this.loggedIn = this.authService.isLoggedIn();

    this.authService.getLoginStatus().subscribe((isLoggedIn) => {
      this.loggedIn = isLoggedIn;
    });
  }

}
