import { Component, OnInit } from '@angular/core';
import {AnnouncementService} from '../../services/announcement.service';
import {MatDialog} from '@angular/material/dialog';
import {Announcement} from '../../model/announcement';


@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit {

  constructor(private service: AnnouncementService, private matDialog: MatDialog) { }
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
  idAnnouncement: any;
  description: any;
  announcement: any;
  disabled: any;
  title: string;
  ngOnInit(): void {
    this.findAllAnnouncement();
  }
  findAllAnnouncement() {
    this.service.findAllAnnouncement().subscribe(resultat => {
      this.data = resultat;
    });
  }
  openModal(element: any) {
    this.matDialog.open(element, {
      width: '800px',
      disableClose: true
    });
  }
  chooseAction(event: any, element: any, elementDelete: any) {
    this.announcement = event.data;
    switch (event.action) {
      case 'delete' :
        this.idAnnouncement = event.data.idAnnouncement;
        this.matDialog.open(elementDelete, {disableClose: true});
        break;
      default :
        event.action === 'edit' ? this.idAnnouncement = event.data.idAnnouncement : this.idAnnouncement = null;
        this.title = 'Modifier';
        this.fillDate(event.data);
        this.matDialog.open(event, {
          width: '800px',
          disableClose: true
        });
        break;
  }}
  addAnnouncement(idAnnouncement) {
    const announcement = new Announcement();
    announcement.Post = this.Post;
    announcement.idAnnouncement = this.idAnnouncement;
    announcement.description = this.description;
    announcement.announcement = this.announcement;
    if (idAnnouncement === null) {
      this.service.postAnnouncement(announcement).subscribe(() => {
        this.ngOnInit();
        this.close();
      });
    } else {
      announcement.id = idAnnouncement;
      this.service.updateAnnouncement(announcement, idAnnouncement).subscribe(() => {
        this.ngOnInit();
        this.close();
      });
    }
  }
  deleteAnnouncement() {
    this.service.deleteAnnouncement(this.idAnnouncement).subscribe(() => {
     this.ngOnInit();
      this.close();
  });
  }
  close() {
    this.Post = null;
    this.idAnnouncement = null;
    this.description = null;
    this.announcement = null;
    this.disabled = false;
    this.matDialog.closeAll();
  }
  private fillDate(data) {
    this.Post = data.Post;
    this.description = data.description;
    this.announcement = data.announcement;
    this.idAnnouncement = data.idAnnouncement;
  }
}
