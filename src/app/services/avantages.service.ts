import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Avantage} from '../model/avantage';


@Injectable({
  providedIn: 'root'
})
export class AvantagesService {
  private url = environment.BASE_URL;

  constructor(private httpClient: HttpClient) {
  }

  findAllAvantages(): Observable<any> {
    return this.httpClient.get(this.url + 'avantage');
  }

  postAvantage(avantage: Avantage): Observable<any> {
    return this.httpClient.post(this.url + 'avantage', avantage);
  }

  deleteAvantage(idAvantage: any): Observable<any> {
    return this.httpClient.delete(this.url + 'avantage/' + idAvantage);
  }
}
