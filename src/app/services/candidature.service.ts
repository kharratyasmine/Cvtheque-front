import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Candidature} from '../model/candidature';
import {Condidat} from '../model/condidat';


@Injectable({
  providedIn: 'root'
})
export class CandidatureService {
  private url = environment.BASE_URL;

  constructor(private httpClient: HttpClient) {
  }

  findAllCandidature(): Observable<any> {
    return this.httpClient.get(this.url + 'candidature');
  }

  postCandidature(candidature: any): Observable<any> {
    return this.httpClient.post(this.url + 'candidature', candidature);
  }

  deleteCandidature(idCandidature: any): Observable<any> {
    return this.httpClient.delete(this.url + 'candidature/' + idCandidature);
  }
  updateCandidature(candidature: Candidature, idCandidature) {
    return this.httpClient.put(this.url + 'candidature/' + idCandidature, candidature);
  }
}
