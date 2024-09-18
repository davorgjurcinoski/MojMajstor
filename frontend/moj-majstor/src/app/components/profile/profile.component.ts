import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {UserProfile} from "../../interfaces/UserProfile";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'] // Fix typo: styleUrl -> styleUrls
})
export class ProfileComponent implements OnInit {
  profile!: any;

  constructor(private service: ProfileService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getMyProfile();
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

  getMyProfile(): void {
    this.service.getMyProfile().subscribe({
      next: (profile: any) => {
        this.profile = profile
      }
    })
  }

  becomeWorker(): void {
    this.router.navigate(['becomeWorker'])
  }
}
