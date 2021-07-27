import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Condidat} from '../model/condidat';


@Injectable({providedIn: 'root'})
export class CondidatService {
  private url = environment.BASE_URL;
  constructor(private httpClient: HttpClient) {
  }

  findAllCondidates(): Observable<any> {
    return this.httpClient.get(this.url + 'candidate');
  }
  postCondidat(condidat: Condidat): Observable<any> {
    return this.httpClient.post(this.url + 'candidate', condidat );
  }
  deleteCondidat(idCondidat: any): Observable<any> {
    return this.httpClient.delete(this.url + 'candidate/' + idCondidat );
  }
  CVCondidat(): Observable<any> {
    return this.httpClient.get(this.url + 'candidate'); }
}


