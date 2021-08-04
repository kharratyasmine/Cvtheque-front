import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Avantage} from '../model/avantage';
import {Competence} from '../model/competence';


@Injectable({
  providedIn: 'root'
})
export class AvantagesService {
  private url = environment.BASE_URL;

  constructor(private httpClient: HttpClient) {
  }

  findAllAvantages(): Observable<any> {
    return this.httpClient.get(this.url + 'advantage');
  }

  postAdvantage(avantage: Avantage): Observable<any> {
    return this.httpClient.post(this.url + 'advantage', avantage);
  }

  deleteAvantage(idAdvantage: any): Observable<any> {
    return this.httpClient.delete(this.url + 'advantage/' + idAdvantage);
  }
  updateAvantage(avantage: Avantage, idAdvantage) {
    return this.httpClient.put(this.url + 'advantage/' + idAdvantage, avantage);
  }
}