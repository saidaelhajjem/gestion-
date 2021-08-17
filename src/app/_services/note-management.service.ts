import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteManagementService {
  url = `${environment.apiUrl}/modeles-documents/note`;

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
    return this.http.post(`${this.url}/filter`, filterBody, { observe: 'response' });
  }

  create(formData): Observable<HttpResponse<any>> {
    return this.http.post(`${this.url}/create`, formData, { observe: 'response' });
  }

  findById(modelId): Observable<HttpResponse<any>> {
    return this.http.get(`${this.url}/${modelId}`, { observe: 'response' });
  }

  deleteById(modelId): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.url}/delete/${modelId}`, { observe: 'response' });
  }

  update(modelId, updateBody): Observable<HttpResponse<any>> {
    return this.http.patch(`${this.url}/${modelId}/edit`, updateBody, { observe: 'response' });
  }
}
