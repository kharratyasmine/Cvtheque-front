import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiplomaService {

  private url = environment.BASE_URL;
  constructor(private httpClient: HttpClient) { }
  findDiplomas(): Observable<any> {
    return this.httpClient.get(this.url + 'diploma');
  }
}
