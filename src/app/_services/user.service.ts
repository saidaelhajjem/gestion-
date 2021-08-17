import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = `${environment.apiUrl}/users`;

  constructor(
    private http: HttpClient
  ) {
  }

  getListUser(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.url}/list/all`, { observe: 'response' });
  }

}
