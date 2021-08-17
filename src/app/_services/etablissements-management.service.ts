import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EtablissementsManagementService {
  url = `${environment.apiUrl}/etablissements`;

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
    return this.http.post(`${this.url}/create`, formData, {observe: 'response'});
  }

  findById(modelId): Observable<HttpResponse<any>> {
    return this.http.get(`${this.url}/${modelId}`, {observe: 'response'});
  }

  deleteById(modelId): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.url}/delete/${modelId}`, {observe: 'response'});
  }

  update(modelId,updateBody): Observable<HttpResponse<any>> {
    return this.http.patch(`${this.url}/${modelId}/edit`, updateBody, {observe: 'response'});
  }

  print(printBody): Observable<HttpResponse<any>> {
    return this.http.post(`${this.url}/print`, printBody, {observe: 'response'});
  }

  getAllEtablissement({ limit_per_page, page }, body): Observable<HttpResponse<any>> {
    return this.http.post(`${this.url}/list/${limit_per_page}/${page}`, body, {observe: 'response'});
  }
}