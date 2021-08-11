import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Announcement} from '../model/announcement';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  private url = environment.BASE_URL;
  constructor(private httpClient: HttpClient) { }
  findAnnouncement(post: any): Observable<any> {
    debugger;
    return this.httpClient.post(this.url + 'announcement/post', post);
  }
  findAllAnnouncement(): Observable<any> {
    return this.httpClient.get(this.url + 'announcement');
  }
  postAnnouncement(announcement: Announcement): Observable<any> {
    return this.httpClient.post(this.url + 'announcement', announcement );
  }
  deleteAnnouncement(idAnnouncement: any): Observable<any> {
    return this.httpClient.delete(this.url + 'announcement/' + idAnnouncement );
  }
  updateAnnouncement(announcement: Announcement, idAnnouncement) {
    return this.httpClient.put(this.url + 'announcement/' + idAnnouncement, announcement);
  }
}
