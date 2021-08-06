import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Postes} from '../model/postes';


@Injectable({
  providedIn: 'root'
})
export class PostesService {

  private url = environment.BASE_URL;
  constructor(private httpClient: HttpClient) {
  }

  findAllPostes(): Observable<any> {
    return this.httpClient.get(this.url + 'post');
  }
  findposteByCandidatureAndCandidate(idCandidature: any, idCandidate: any): Observable<any> {
    return this.httpClient.get(this.url + 'post/' + idCandidature + '/' + idCandidate);
  }
  postPostes(Poste: Postes): Observable<any> {
    return this.httpClient.post(this.url + 'post', Poste);
  }
  deletePostes(id_post: any): Observable<any> {
    return this.httpClient.delete(this.url + 'post/' + id_post );
  }
  updateCondidat(Poste: Postes, id_post) {
    return this.httpClient.put(this.url + 'post/' + id_post, Poste);
  }
}
