import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {UserProfile} from "../interfaces/UserProfile";
import {Municipality} from "../interfaces/enums/Municipality";
import {Category} from "../interfaces/enums/Category";
import {Page} from "../interfaces/page.interface";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = '/api/profile';

  constructor(private http: HttpClient) {
  }

  getProfile(id: number | null): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}?id=${id}`).pipe(
      map(user => {
        if (typeof user.worker?.category === 'string') {
          const municipality = user.worker.municipality as unknown as keyof typeof Municipality;
          const category = user.worker.category as unknown as keyof typeof Category;
          user.worker.category = Category[category];
          user.worker.municipality = Municipality[municipality];
        }
        return user;
      })
    );
  }

  getMyProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/myprofile`).pipe(
      map(user => {
        console.log('Original user data:', user);
        if (user.worker && typeof user.worker.category === 'string') {
          const municipality = user.worker.municipality as unknown as keyof typeof Municipality;
          const category = user.worker.category as unknown as keyof typeof Category;
          user.worker.category = Category[category];
          user.worker.municipality = Municipality[municipality];
        }
        console.log('Transformed user data:', user);
        return user;
      })
    );
  }


  searchUsers(searchTerm: string): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(`/api/profile/search?search=${searchTerm}`).pipe(
      map(users => users.map(user => {
        if (typeof user.worker?.category === 'string') {
          const municipality = user.worker.municipality as unknown as keyof typeof Municipality;
          const category = user.worker.category as unknown as keyof typeof Category;
          user.worker.category = Category[category];
          user.worker.municipality = Municipality[municipality];
        }
        return user;
      }))
    );
  }

  searchUsersPageable(searchTerm: string, page: number = 0, size: number = 10): Observable<Page<UserProfile>> {
    return this.http.get<Page<UserProfile>>(`/api/profile/searchPageable?search=${searchTerm}&page=${page}&size=${size}`).pipe(
      map(responsePage => {
        const users = responsePage.content.map(user => {
          if (typeof user.worker?.category === 'string') {
            const municipality = user.worker.municipality as unknown as keyof typeof Municipality;
            const category = user.worker.category as unknown as keyof typeof Category;
            user.worker.category = Category[category];
            user.worker.municipality = Municipality[municipality];
          }
          return user;
        });

        return {
          ...responsePage,
          content: users
        };
      })
    );
  }


  updateProfile(profile: UserProfile): Observable<UserProfile> {
    return this.http.post<UserProfile>(this.apiUrl, profile)
  }
}
