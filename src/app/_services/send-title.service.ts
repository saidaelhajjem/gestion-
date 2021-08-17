import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendTitleService {

  private subject = new Subject<any>();

  sendTitle(message: any) {
    this.subject.next({ text: message });
  }

  clearFilter() {
    this.subject.next();
  }

  getTitle(): Observable<any> {
    return this.subject.asObservable();
  }

}
