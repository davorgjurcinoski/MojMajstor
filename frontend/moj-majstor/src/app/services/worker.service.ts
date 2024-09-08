import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  private apiUrl = '/api/worker';

  constructor(private http: HttpClient) { }

  create(workerData: any) {
    return this.http.post(this.apiUrl, workerData);
  }
}
