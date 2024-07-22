import { Component } from '@angular/core';

@Component({
  selector: 'app-servicer',
  templateUrl: './servicer.component.html',
  styleUrl: './servicer.component.scss'
})
export class ServicerComponent {
  name: string = 'Мајстор Иван';
  email: string = 'maistor@example.com';
  mobile: string = '070/123-456';
  category: string = 'Водоинсталатер';
  municipality: string = 'Карпош';
  description: string = 'Искуство од над 10 години во областа на водоинсталациите.';
  averageRating: number = 4.5;
  newComment: string = '';
  newRating: number = 5;
  ratings: number[] = [1, 2, 3, 4, 5];
  comments: { username: string, text: string, rating: number }[] = [
    { username: 'Корисник1', text: 'Одличен мајстор, брзо и квалитетно работи!', rating: 5 },
    { username: 'Корисник2', text: 'Задоволен сум од услугата.', rating: 4 }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  addComment(): void {
    if (this.newComment && this.newRating) {
      this.comments.push({
        username: 'НовоКорисник',
        text: this.newComment,
        rating: this.newRating
      });
      this.newComment = '';
      this.newRating = 5;
    }
  }
}
