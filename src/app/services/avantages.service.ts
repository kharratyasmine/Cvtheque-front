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
    return this.httpClient.get(this.url + 'advantage');
  }
  findAllAvantagesByIdCandidature(idCandidature: any, idAdvantage: any): Observable<any> {
    return this.httpClient.get(this.url + 'advantage/query/' + idCandidature + '/' + idAdvantage );
  }
  findAllAvantageByCandidature(idCandidature: any, idAdvantage: any): Observable<any> {
    return this.httpClient.get(this.url + 'candidate_advantages/' + idCandidature + '/' + idAdvantage );
  }
  postAdvantage(avantage: Avantage): Observable<any> {
    return this.httpClient.post(this.url + 'advantage', avantage);
  }
  postAvantageCandidature(avantage: any): Observable<any> {
    return this.httpClient.post(this.url + 'candidate_advantages', avantage);
  }
  deleteAvantage(idAdvantage: any): Observable<any> {
    return this.httpClient.delete(this.url + 'advantage/' + idAdvantage);
  }
  deleteCandidateAvantage(idAdvantage: any): Observable<any> {
    return this.httpClient.delete(this.url + 'candidate_advantages/' + idAdvantage);
  }
  updateAvantage(avantage: Avantage, idAdvantage) {
    return this.httpClient.put(this.url + 'advantage/' + idAdvantage, avantage);
  }
}
