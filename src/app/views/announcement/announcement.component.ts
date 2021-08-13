import { Component, OnInit } from '@angular/core';
import {AnnouncementService} from '../../services/announcement.service';
import {MatDialog} from '@angular/material/dialog';
import {Announcement} from '../../model/announcement';
import {PostesService} from '../../services/postes.service';


@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit {

  constructor(private service: AnnouncementService, private matDialog: MatDialog, private postesservices: PostesService) { }
  settings = {
    columns: {
      post: {
        title: 'Poste' ,
        valuePrepareFunction: (data) => {
          return data.post_name; },
      },
      description: {
        title: 'Description Action' },
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [
        { name: 'delete',
          title: '<i class="icon-trash width: 300px"></i> ', },
        { name: 'edit',
          title: '<i class="icon-pencil width: 300px"></i> ', },
      ],
    },
  };
  data = [];
  Post: any;
  id_announcement = null;
  description: any;
  disabled: any;
  title: string;
  listPostes: any;
  ngOnInit(): void {
    this.findAllAnnouncement();
    this.findAllPostes();
  }
  findAllAnnouncement() {
    this.service.findAllAnnouncement().subscribe(resultat => {
      this.data = resultat;
    });
  }
  findAllPostes() {
    this.postesservices.findAllPostes().subscribe(resultat => {
      this.listPostes = resultat;
    });
  }
  openModal(annonce: any) {
    this.title = 'Nouvelle';
    this.matDialog.open(annonce, {
      width: '800px',
      disableClose: true
    });
  }
  chooseAction(event: any, annonce: any, annonceDelete: any) {
    switch (event.action) {
      case 'delete' :
        this.id_announcement = event.data.id_announcement;
        this.matDialog.open(annonceDelete, {disableClose: true});
        break;
      default :
        event.action === 'edit' ? this.id_announcement = event.data.idAnnouncement : this.id_announcement = null;
        this.title = 'Modifier';
        this.fillDate(event.data);
        this.matDialog.open(annonce, {
          width: '800px',
          disableClose: true
        });
        break;
    }}
  addAnnouncement(id_announcement) {
    const announcement  = new Announcement();
    announcement.post = this.listPostes.find(x => x.id_post === this.Post);
    announcement.description = this.description;
    announcement.deleted = 0;
    if (this.id_announcement === null) {
      this.service.postAnnouncement(announcement).subscribe(() => {
        this.ngOnInit();
        this.close();
      });
    } else {
      announcement.id_announcement = id_announcement;
      this.service.updateAnnouncement(announcement, id_announcement).subscribe(() => {
        this.ngOnInit();
        this.close();
      });
    }
  }
  deleteAnnouncement() {
    this.service.deleteAnnouncement(this.id_announcement).subscribe(() => {
      this.ngOnInit();
      this.close();
    });
  }
  close() {
    this.Post = null;
    this.id_announcement = null;
    this.description = null;
    this.disabled = false;
    this.matDialog.closeAll();
  }
  private fillDate(data) {
    this.Post = data.post.id_post;
    this.id_announcement = data.id_announcement;
    this.description = data.description;
  }
}
