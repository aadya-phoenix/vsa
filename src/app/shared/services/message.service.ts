import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private subject = new Subject<any>();

  applyFilter(filterdata: any) {
    this.subject.next({ filter: filterdata });
  }

  getFilterObserab(): any {
    return this.subject.observers;
  }

  FilterObserab(): Observable<any> {
    return this.subject.asObservable();
  }
}
