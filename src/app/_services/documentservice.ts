import { HttpClient,HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Document } from './../_models/document';

@Injectable()
export class DocumentService {

    constructor(private http: HttpClient) { }

    getDocumentsSmall() {
        return this.http.get<any>('./assets/documents-small.json')
            .toPromise()
            .then(res => <Document[]>res.data)
            .then(data => { return data; });
    }

    lastDocumentVu(): Observable<HttpResponse<any>> {
            return this.http.get(`./assets/lastDocumentvued.json`, {observe: 'response'});
        }  
   


}