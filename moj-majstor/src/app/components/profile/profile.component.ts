import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  username: string = 'Корисник123';
  email: string = 'korisnik@example.com';
  address: string = 'Ул. Пример 12, Скопје';
  dateOfBirth: string = '01.01.1990';
  municipality: string = 'Центар';
  phoneNumber: string = '070/123-456';

  constructor() { }

  ngOnInit(): void {
  }


  saveChanges(): void {
    // Add logic to save changes
    console.log('Changes saved!');
  }


}
