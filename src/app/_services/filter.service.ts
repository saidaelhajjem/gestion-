import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private subject = new Subject<any>();
  private subjectfilter = new Subject<any>();

  sendFilter(message: any) {
    this.subject.next({ text: message });
  }

  clearFilter() {
    this.subject.next();
  }

  getFilter(): Observable<any> {
    return this.subject.asObservable();
  }


  choiseFilter(message: string) {
    this.subjectfilter.next({ text: message });
  }
  getFilte(): Observable<any> {
    return this.subjectfilter.asObservable();
  }
}
