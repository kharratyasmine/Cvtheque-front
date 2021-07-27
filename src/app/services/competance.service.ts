import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Competance} from '../model/competance';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompetanceService {
  private url = environment.BASE_URL;
  constructor(private httpClient: HttpClient) {
  }

  findAllCompetance(): Observable<any> {
    return this.httpClient.get(this.url + 'competance');
  }

  postCompetance(competance: Competance): Observable<any> {
    return this.httpClient.post(this.url + 'competance', competance);
  }

  deleteCompetance(idCompetance: any): Observable<any> {
    return this.httpClient.delete(this.url + 'competance/' + idCompetance);
  }
}
