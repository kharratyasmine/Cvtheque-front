import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

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
}
