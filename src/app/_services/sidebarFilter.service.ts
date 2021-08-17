import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarFilterService {

  private subject = new Subject<any>();
  constructor() { }

  send(message: boolean): void {
    this.subject.next({ actif: message });
  }

  clear(): void {
    this.subject.next();
  }

  get(): Observable<any> {
    return this.subject.asObservable();
  }
}
