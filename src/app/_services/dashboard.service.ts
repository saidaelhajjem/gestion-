import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  url = `${environment.apiUrl}/dashboard`;
  constructor(private http: HttpClient) { }

  gestionContrat(): Observable<HttpResponse<any>> {
    return this.http.get(`./assets/dashboardStatique.json`, { observe: 'response' });
  }

  allFilter(keyword: string = '', date: string = ''): Observable<any> {
    const url = `${this.url}all`;
    const kwrd = { keyword: keyword, date: date };
    return this.http.post<any>(url, kwrd);
  }


  getInfoDashboard(body): Observable<HttpResponse<any>> {
    return this.http.post(`${this.url}`, body, { observe: 'response' });
  }
}
