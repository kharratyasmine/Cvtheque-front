import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Candidature} from '../model/candidature';


@Injectable({
  providedIn: 'root'
})
export class CandidatureService {
  private url = environment.BASE_URL;

  constructor(private httpClient: HttpClient) {
  }

  findAllCandidature(): Observable<any> {
    return this.httpClient.get(this.url + 'Candidature');
  }

  postCandidature(Candidature: Candidature): Observable<any> {
    return this.httpClient.post(this.url + 'Candidature', Candidature);
  }

  deleteCandidature(idCandidature: any): Observable<any> {
    return this.httpClient.delete(this.url + 'Candidature/' + idCandidature);
  }
}
