import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Suivis} from '../model/suivis';

@Injectable({providedIn: 'root'})
export class SuivisService {
  private url = environment.BASE_URL;

  constructor(private httpClient: HttpClient) {
  }

  findAllSuivis(): Observable<any> {
    return this.httpClient.get(this.url + 'suivis');
  }

  postSuivis(suivis: Suivis): Observable<any> {
    return this.httpClient.post(this.url + 'suivis', suivis);
  }

  deleteSuivis(idSuivis: any): Observable<any> {
    return this.httpClient.delete(this.url + 'suivis/' + idSuivis);
  }

}

