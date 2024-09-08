import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {UserProfile} from "../../interfaces/UserProfile";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {ReviewService} from "../../services/review.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-servicer',
  templateUrl: './servicer.component.html',
  styleUrl: './servicer.component.scss'
})
export class ServicerComponent implements OnInit {
  profile$!: Observable<UserProfile>;
  reviews$!: Observable<any>;
  feedback = {
    rating: 3,
    comment: ''
  };
  ratings = [1, 2, 3, 4, 5];
  isLoggedIn: boolean = false;

  constructor(private profileService: ProfileService,
              private route: ActivatedRoute,
              private reviewService: ReviewService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.update();
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  addComment(reviewingId: number): void {
    const ratingData = {
      reviewingId: reviewingId,
      rating: this.feedback.rating,
      comment: this.feedback.comment
    };
    this.reviewService.review(ratingData).subscribe({
      next: () => {
        this.update();
        window.location.reload()
      }
    })
  }

  update() {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      if (id) {
        this.profile$ = this.profileService.getProfile(id)
        this.reviews$ =this.reviewService.fetchReviews(id);
      }
    })
  }

}
