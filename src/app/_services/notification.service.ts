import { HttpClient,HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  alerte(): Observable<HttpResponse<any>> {
    return this.http.get(`./assets/lastDocumentvued.json`, {observe: 'response'});} 


}
