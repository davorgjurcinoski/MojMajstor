import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: String = '';
  password: String = '';

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private router: Router
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  login(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        const token = response.token;
        if (token) {
          localStorage.setItem('jwtToken', token);
          this.authService.updateLoginStatus(true);
          this.closeDialog();
          this.router
            .navigate(['/home'])
            .then(() => {
              console.log('Navigation to home successful!');
            })
            .catch((error) => {
              console.error('Error during navigation:', error);
            });
        }
      },
      error: (error) => {},
    });
  }
}
