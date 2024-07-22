import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  categories = ['Автомеханичар', 'Водоинсталатер', 'Електричар', 'Молер'];
  municipalities = ['Центар', 'Кисела Вода', 'Ѓорче Петров', 'Шутка'];


  constructor(private router: Router){}

  masters = [
    { name: 'Иван Иванов', category: 'Автомеханичар', municipality: 'Центар', phone: '070123456' },
    { name: 'Марко Марков', category: 'Водоинсталатер', municipality: 'Кисела Вода', phone: '071234567' },
    // Add more dummy data here
  ];

  selectedCategory = '';
  selectedMunicipality = '';

  get filteredMasters() {
    return this.masters.filter(master =>
      (this.selectedCategory === '' || master.category === this.selectedCategory) &&
      (this.selectedMunicipality === '' || master.municipality === this.selectedMunicipality)
    );
  }

  showMoreInfo() {
    // Implement the logic to show more information
    console.log('More info about');
    this.router.navigate(['servicer']);
  }
}