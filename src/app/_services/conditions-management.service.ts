import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConditionsManagementService {
  url = `${environment.apiUrl}/modeles-documents`;

  constructor(
    private http: HttpClient
  ) {
  }

  /**
   * Get list and/or filter it by filterBody params.
   * you can also tri it
   * use pagination or not too
   *
   * @param filterBody
   */
  filter(filterBody: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.url}/filter`, filterBody, {observe: 'response'});
  }

  create(formData): Observable<HttpResponse<any>> {
    return this.http.post(`${this.url}/condition/create`, formData, {observe: 'response'});
  }

  findById(modelId): Observable<HttpResponse<any>> {
    return this.http.get(`${this.url}/condition/find/${modelId}`, {observe: 'response'});
  }

  deleteById(modelId): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.url}/condition/${modelId}/delete`, {observe: 'response'});
  }

  update(modelId,updateBody): Observable<HttpResponse<any>> {
    return this.http.patch(`${this.url}/condition/${modelId}/edit`, updateBody, {observe: 'response'});
  }

  getListCondition(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.url}/conditions`, {observe: 'response'});

  }
}
