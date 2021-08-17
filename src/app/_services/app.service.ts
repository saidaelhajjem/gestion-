import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Modele } from "../_models/modele";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  defaultQueryParams = {
  };
  // global variables
  currentModeleSubject = new Subject();
  private currentQueryParamsSubject = new BehaviorSubject(this.defaultQueryParams);

  // real time subjects
  private _currentProject: any = new Subject();
  private _currentModel = new BehaviorSubject(localStorage.getItem('_CurrentModele') ? JSON.parse(localStorage.getItem('_CurrentModele')) : {});

  constructor(

  ) {
  }

  initApp() {
  }


  getCurrentModele(): Observable<any> {
    return this._currentModel.asObservable();
  }

  setCurrentModeleObservable(value) {
    localStorage.setItem('_CurrentModele',JSON.stringify(value));
    this._currentModel.next(value);
  }

}
