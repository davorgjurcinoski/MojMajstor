import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UserProfile } from "../../interfaces/UserProfile";
import { ProfileService } from "../../services/profile.service"
import {Router} from "@angular/router";
@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrl: './search-user.component.scss'
})
export class SearchUserComponent implements OnInit{
  searchForm: FormControl = new FormControl('');
  users: UserProfile[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private service: ProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.searchForm.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(400),
        switchMap((word) =>
          this.service.searchUsers(word)
        )
      )
      .subscribe({
        next: (data: UserProfile[]) => {
          this.users = data;
        },
        error: (error) => {
          console.error('Error fetching users:', error);
        },
      });
  }

  openProfile(id: number): void {
    this.dialog.closeAll();
    this.router.navigate([`/servicer`, id]);
  }
}
