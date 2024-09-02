import { Component } from '@angular/core';
import {LoginComponent} from "../login/login.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  loggedIn = false;
  menuOpen = false;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router) {
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  ngOnInit() {
    this.loggedIn = this.authService.isLoggedIn()

    this.authService.getLoginStatus().subscribe((isLoggedIn: boolean) => {
      this.loggedIn = isLoggedIn;
    })
  }

  logout() {
    localStorage.removeItem('jwtToken')
    this.authService.updateLoginStatus(false);
    this.router.navigate(['/home']);
  }

  openLoginPopup(): void {
    this.dialog.open(LoginComponent, {
      width: '400px',
      panelClass: 'custom-dialog'
    });
  }
}
