import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Competence} from '../model/competence';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompetenceService {
  private url = environment.BASE_URL;
  constructor(private httpClient: HttpClient) {
  }

  findAllCompetence(): Observable<any> {
    return this.httpClient.get(this.url + 'competence');
  }
  postCompetence(competence: Competence): Observable<any> {
    return this.httpClient.post(this.url + 'competence', Competence);
  }

  deleteCompetence(idCompetence: any): Observable<any> {
    return this.httpClient.delete(this.url + 'competence/' + idCompetence);
  }

  updateCompetence(competence: Competence, idCompetence) {
    return this.httpClient.put(this.url + 'competence/' + idCompetence, Competence);
  }
}
