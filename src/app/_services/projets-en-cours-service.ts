import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ProjetsEnCoursDocument } from './../_models/projets-en-cours-document';

@Injectable()
export class ProjetsEnCoursService {
    url = `${environment.apiUrl}/statut-projects`;
    
    constructor(private http: HttpClient) { }

    getDocumentsSmall() {
        return this.http.get<any>('./assets/projets-en-cours-small.json')
            .toPromise()
            .then(res => <ProjetsEnCoursDocument[]>res.data)
            .then(data => { return data; });
    }

    getAllListStatus(): Observable<HttpResponse<any>> {
        return this.http.get(`${this.url}`, {observe: 'response'});
      }

}