import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReferencesManagementService {
  url = `${environment.apiUrl}`;

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
    return this.http.post(`${this.url}/references/filter`, filterBody, {observe: 'response'});
  }

  create(formData): Observable<HttpResponse<any>> {
    return this.http.post(`${this.url}/references/create`, formData, {observe: 'response'});
  }

  findById(modelId): Observable<HttpResponse<any>> {
    return this.http.get(`${this.url}/references/find/${modelId}`, {observe: 'response'});
  }

  deleteById(modelId): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.url}/references/delete/${modelId}`, {observe: 'response'});
  }

  update(updateBody): Observable<HttpResponse<any>> {
    return this.http.patch(`${this.url}/references/update`, updateBody, {observe: 'response'});
  }
 
  getAllReference(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.url}/references/list/all`, {observe: 'response'});
  }

  getAllReferenceFormat(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.url}/references-formats`, {observe: 'response'});
  }

}
