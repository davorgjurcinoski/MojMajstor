import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {UserProfile, Role} from "../../interfaces/UserProfile";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'] // Fix typo: styleUrl -> styleUrls
})
export class ProfileComponent implements OnInit {
  profile!: UserProfile;

  constructor(private service: ProfileService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.service.getProfile(null).subscribe(profile => {
      this.profile = profile;
    });
  }

  saveChanges(): void {
    this.service.updateProfile(this.profile).subscribe({
      next: () => {
      },
      error: (error) => console.error(error),
      complete: () => {
        this.router.navigate(['/']);
      }
    })
  }
  becomeWorker(): void {
    this.router.navigate(['becomeWorker'])
  }
}
