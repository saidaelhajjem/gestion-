import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AssociateUnidentified } from './../_models/associateUnidentified';

@Injectable()
export class AssociateUnidentifiedServise {

    constructor(private http: HttpClient) { }

    getAssociateUnidentified() {
        return this.http.get<any>('./assets/associate-unidentified.json')
            .toPromise()
            .then(res => <AssociateUnidentified[]>res.data)
            .then(data => { return data; });
    }


}