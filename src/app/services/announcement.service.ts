import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  private url = environment.BASE_URL;
  constructor(private httpClient: HttpClient) { }
  findAnnouncement(post: any): Observable<any> {
    return this.httpClient.post(this.url + 'announcement/post', post);
  }
}
