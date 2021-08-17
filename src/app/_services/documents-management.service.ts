import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsManagementService {
  url = `${environment.apiUrl}/modeles/documents`;
  apiurl = `${environment.apiUrl}/modeles-documents`;
  urlapi = `${environment.apiUrl}/modeles`;

  constructor(
    private http: HttpClient
  ) {
  }

  filter(filterBody: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.url}/filter`, filterBody, {observe: 'response'});
  }

  create(formData): Observable<HttpResponse<any>> {
    return this.http.post(`${this.url}/create`, formData, {observe: 'response'});
  }

  import(formData): Observable<HttpResponse<any>> {
    return this.http.post(`${this.url}/import`, formData, {observe: 'response'});
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

  gestionModels(): Observable<HttpResponse<any>> {
    return this.http.get(`./assets/models.json`, {observe: 'response'});}


  importFile(File): Observable<any> {
    const formData = new FormData();
    formData.append('imported_file', File);
    return this.http.post(`${this.url}/import-File`, formData);
  }

  getListModele({limit_per_page, page },body): Observable<HttpResponse<any>> {
    return this.http.post(`${this.url}/list/${limit_per_page}/${page}`,body, {observe: 'response'});
  }

  getAllTypeDocument(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiurl}/type/all`, {observe: 'response'});
  }

  CreationBaliseNonIdentifie(modelId,formData): Observable<HttpResponse<any>> {
    return this.http.post(`${this.url}/${modelId}/references/create`, formData, {observe: 'response'});
  }

  createModele(formData): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.urlapi}/create`, formData, {observe: 'response'});
  }


  getContenuDocument(modelId): Observable<HttpResponse<any>> {
    return this.http.get(`${this.url}/${modelId}/contenu`, {observe: 'response'});
  }

  getAllByModelId(modelId): Observable<HttpResponse<any>> {
    return this.http.get(`${this.urlapi}/${modelId}/documents`, {observe: 'response'});}

}
