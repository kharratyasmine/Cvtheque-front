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
  findAllCompetenceByIdCandidature(idCandidature: any, idCompetence: any): Observable<any> {
    return this.httpClient.get(this.url + 'competence/query/' + idCandidature + '/' + idCompetence );
  }
  findAllCompetenceByCandidature(idCandidature: any, idCompetence: any): Observable<any> {
    return this.httpClient.get(this.url + 'candidate_competence/' + idCandidature + '/' + idCompetence );
  }
  postCompetence(competence: Competence): Observable<any> {
    return this.httpClient.post(this.url + 'competence', competence);
  }
  postCompetenceCandidature(competence: any): Observable<any> {
    return this.httpClient.post(this.url + 'candidate_competence', competence);
  }
  deleteCandidateCompetence(idCompetence: any): Observable<any> {
    return this.httpClient.delete(this.url + 'candidate_competence/' + idCompetence);
  }
  deleteCompetence(idCompetence: any): Observable<any> {
    return this.httpClient.delete(this.url + 'competence/' + idCompetence);
  }
 updateCompetence(competence: Competence, idCompetence) {
    return this.httpClient.put(this.url + 'competence/' + idCompetence, competence);
  }
}
