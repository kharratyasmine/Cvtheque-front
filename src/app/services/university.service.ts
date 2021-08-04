import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {University} from '../model/university';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  private url = environment.BASE_URL;

  constructor(private httpClient: HttpClient) {
  }
  findUniversities(): Observable<any> {
    return this.httpClient.get(this.url + 'university');
  }
  postUniversities(university: University): Observable<any> {
    return this.httpClient.post(this.url + 'university', university );
  }
  deleteUniversities(university_id: any): Observable<any> {
    return this.httpClient.delete(this.url + 'university/' + university_id );
  }
}
