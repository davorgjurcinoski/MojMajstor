import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegisterService} from "../../services/register.service";
import {Router} from "@angular/router";
import {WorkerService} from "../../services/worker.service";

@Component({
  selector: 'app-become-worker',
  templateUrl: './become-worker.component.html',
  styleUrl: './become-worker.component.scss'
})
export class BecomeWorkerComponent implements OnInit {

  workerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private service: WorkerService,
              private router: Router) {
  }

  ngOnInit() {
    this.workerForm = this.formBuilder.group({
      address: ['', Validators.required],
      municipality: ['', Validators.required],
      category: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      description: ['', Validators.required]
    });
  }


  create(): void {
    this.service.create(this.workerForm).subscribe({
      next: () => {
        this.router.navigate(['/home']).then(() => {
          console.log('Navigation to home successful!');
        }).catch((error) => {
          console.error('Error during navigation:', error);
        });
      },
      error: () => {
      }
    })
  }

  check(): void {
    for (const key in this.workerForm.controls) {
      const control = this.workerForm.get(key);

      if (control?.invalid) {
        console.log(`Field '${key}' is invalid.`);
      }
    }
  }

}
