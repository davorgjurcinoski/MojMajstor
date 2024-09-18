import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { UserProfile } from '../../interfaces/UserProfile';
import { Page } from '../../interfaces/page.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  categories = ['Автомеханичар', 'Водоинсталатер', 'Електричар', 'Молер'];
  municipalities = ['Центар', 'Кисела Вода', 'Ѓорче Петров', 'Шутка'];

  users: UserProfile[] = [];
  displayedUsers: MatTableDataSource<UserProfile> = new MatTableDataSource<UserProfile>();
  totalPages: number = 0;
  currentPage: number = 0;
  selectedCategory = '';
  selectedMunicipality = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router, private service: ProfileService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(page: number = 0) {
    this.service.searchUsersPageable('', page).subscribe({
      next: (result: Page<UserProfile>) => {
        this.users = result.content;
        this.totalPages = result.totalPages;
        this.currentPage = result.number;
        this.displayedUsers.data = this.users;
        this.paginator.pageIndex = this.currentPage;
      }
    });
  }

  get filteredMasters() {
    return this.users.filter(master =>
      (this.selectedCategory === '' || master.worker?.category === this.selectedCategory) &&
      (this.selectedMunicipality === '' || master.worker?.municipality === this.selectedMunicipality)
    );
  }

  applyFilter() {
    this.displayedUsers.filter = `${this.selectedCategory} ${this.selectedMunicipality}`.trim().toLowerCase();
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.loadUsers(this.currentPage + 1);
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.loadUsers(this.currentPage - 1);
    }
  }

  showMoreInfo(id: number): void {
    this.router.navigate([`/servicer`, id]);
  }

}
