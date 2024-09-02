import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {RegisterService} from "../../services/register.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  showPasswordMismatchError = false;
  signUpForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private service: RegisterService,
              private router: Router) {
  }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      municipality: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      c_password: ['', Validators.required]
    });
  }

  signUp(): void {

    if (this.signUpForm.controls['password'].value !== this.signUpForm.controls['c_password'].value) {
      this.showPasswordMismatchError = true;
      return;
    }

    this.showPasswordMismatchError = false;

    const registerData = {
      fullName: this.signUpForm.controls['fullName'].value,
      email: this.signUpForm.controls['email'].value,
      address: this.signUpForm.controls['address'].value,
      municipality: this.signUpForm.controls['municipality'].value,
      phoneNumber: this.signUpForm.controls['phoneNumber'].value,
      password: this.signUpForm.controls['password'].value
    };

    this.service.signup(registerData).subscribe({
      next: () => {
        this.router.navigate(['/home']).then(() => {
          console.log('Navigation to home successful!');
        }).catch((error) => {
          console.error('Error during navigation:', error);
        });
      },
      error: () => {
      }
    });

  }
}
