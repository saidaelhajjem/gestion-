import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployersAndEmployeesManagementService {
  urlEmployer = `${environment.apiUrl}/employeurs`;
  urlEmployee = `${environment.apiUrl}/employes`;

  constructor(
    private http: HttpClient
  ) {
  }


  print(printBody): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlEmployer}/print`, printBody, { observe: 'response' });
  }

  /**
   * Get list and/or filter it by filterBody params.
   * you can also tri it
   * use pagination or not too
   *
   * @param filterBody
   */
  filterEmployee(filterBody: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlEmployee}/filter`, filterBody, { observe: 'response' });
  }

  createEmployee(formData): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlEmployee}/create`, formData, { observe: 'response' });
  }

  findByIdEmployee(modelId): Observable<HttpResponse<any>> {
    return this.http.get(`${this.urlEmployee}/${modelId}`, { observe: 'response' });
  }

  deleteByIdEmployee(modelId, updateBody): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlEmployee}/${modelId}/delete`, updateBody, { observe: 'response' });
  }

  importEmployee(formData): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlEmployee}/import`, formData, { observe: 'response' });
  }

  updateEmployee(modelId, updateBody): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlEmployee}/${modelId}/edit`, updateBody, { observe: 'response' });
  }

  getAllEmployes({ limit_per_page, page }, body): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlEmployee}/list/${limit_per_page}/${page}`, body, { observe: 'response' });
  }

  getActifEmployes(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.urlEmployee}/list/actifs`, { observe: 'response' });
  }

  /**
   * Get list and/or filter it by filterBody params.
   * you can also tri it
   * use pagination or not too
   *
   * @param filterBody
   */
  filterEmployer(filterBody: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlEmployer}/filter`, filterBody, { observe: 'response' });
  }

  createEmployer(formData): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlEmployer}/create`, formData, { observe: 'response' });
  }

  findByIdEmployer(modelId): Observable<HttpResponse<any>> {
    return this.http.get(`${this.urlEmployer}/${modelId}`, { observe: 'response' });
  }

  importEmployer(formData): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlEmployer}/import`, formData, { observe: 'response' });
  }

  deleteByIdEmployer(modelId, updateBody): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlEmployer}/${modelId}/delete`, updateBody, { observe: 'response' });
  }

  updateEmployer(modelId, updateBody): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlEmployer}/${modelId}/edit`, updateBody, { observe: 'response' });
  }

  getActifsEmployer(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.urlEmployer}/list/actifs`, { observe: 'response' });
  }

  getAllEmployer({ limit_per_page, page }, body): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlEmployer}/list/${limit_per_page}/${page}`, body, { observe: 'response' });
  }


}
