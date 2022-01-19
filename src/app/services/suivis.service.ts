import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Suivis} from '../model/suivis';
import {Condidat} from '../model/condidat';
import {DateFormatter} from 'ngx-bootstrap/datepicker';

@Injectable({providedIn: 'root'})
export class SuivisService {
  private url = environment.BASE_URL;

  constructor(private httpClient: HttpClient) {
  }
  findAllSuivis(): Observable<any> {
    return this.httpClient.get(this.url + 'candidature_steps');
  }
  findAllSuivisByIdCandidature(idCandidature: any, idCandidate: any): Observable<any> {
    return this.httpClient.get(this.url + 'candidature_steps/query/' + idCandidature + '/' + idCandidate );
  }
  postSuivis(suivis: Suivis): Observable<any> {
    return this.httpClient.post(this.url + 'candidature_steps', suivis);
  }
  sendMail(condidat: Condidat, sequence: string, post: string, date_input: any, heure: any, type: any): Observable<any> {
   const params =  new HttpParams().set('date', date_input).set('heure', heure).set('type', type);

    return this.httpClient.post(this.url + 'candidate/email/'  + sequence + '/' + post, condidat, {params: params});
  }
  deleteSuivis(id_candidature_steps: any): Observable<any> {
    return this.httpClient.delete(this.url + 'candidature_steps/' + id_candidature_steps);
  }
  updateSuivis(suivis: Suivis, id_candidature_steps) {
    return this.httpClient.put(this.url + 'candidature_steps/' + id_candidature_steps, suivis);

}


}

