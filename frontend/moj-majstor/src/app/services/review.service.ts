import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) {
  }

  review(ratingData: any): Observable<any> {
    console.log(ratingData)

    return this.http.post('/api/review', ratingData);

  }

  fetchReviews(id: number): Observable<any> {
    return this.http.get('/api/review', { params: { id: id.toString() } });
  }
}
