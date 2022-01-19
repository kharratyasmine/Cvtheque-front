import {Injectable} from '@angular/core';
import {BehaviorSubject, observable, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class GenericService {
  message: Subject<any> = new BehaviorSubject(null);
  subscribeMessage = this.message.asObservable();
  disabledData: Subject<any> = new BehaviorSubject(null);
  subscribeDisabledData = this.disabledData.asObservable();

  addData(data: any) {
    this.message.next(data);
  }
  addDisabled(data: any) {
    this.disabledData.next(data);
  }
}

