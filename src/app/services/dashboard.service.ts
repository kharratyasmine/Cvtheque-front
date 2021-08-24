import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private url = environment.BASE_URL;

  constructor(private httpClient: HttpClient) {
  }
  findAllbystatus(): Observable<any> {
  return this.httpClient.get(this.url + 'candidature_steps/listcandidaturebyrh');
}
  findCandidaturebytechnique(): Observable<any> {
    return this.httpClient.get(this.url + 'candidature_steps/nbrcandidaturebyTechnique' );
  }
  findCandidaturebyorale(): Observable<any> {
    return this.httpClient.get(this.url + 'candidature_steps/nbrcandidaturebyorale');
  }
  findCandidaturebyautre(): Observable<any> {
    return this.httpClient.get(this.url + 'candidature_steps/nbrcandidaturebyautre');
  }
  findCandidaturebyrh(): Observable<any> {
    return this.httpClient.get(this.url + 'candidature_steps/nbrcandidaturebyrh');
  }
  findcandidaturebypost(): Observable<any> {
    return this.httpClient.get(this.url + 'post/nbrcandidaturebypost');
  }

}
