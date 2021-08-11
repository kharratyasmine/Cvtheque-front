import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {Condidat} from '../model/condidat';

@Injectable({providedIn: 'root'})
export class CondidatService {
  private url = environment.BASE_URL;
  private ResponseContentType: any;
  private http: any;
  constructor(private httpClient: HttpClient) {
  }
  findAllCondidates(): Observable<any> {
    return this.httpClient.get(this.url + 'candidate');
  }
  postCondidat(candidate: Condidat): Observable<any> {
    return this.httpClient.post(this.url + 'candidate', candidate );
  }
  deleteCandidate(idCandidate: any): Observable<any> {
    return this.httpClient.delete(this.url + 'candidate/' + idCandidate );
  }
  CVCondidat(): Observable<any> {
    return this.httpClient.get(this.url + 'candidate'); }

  updateCondidat(candidate: Condidat, idCandidate) {
    return this.httpClient.put(this.url + 'candidate/' + idCandidate, candidate);
  }

  getDocument() {
    return of('https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf');
  }

}
