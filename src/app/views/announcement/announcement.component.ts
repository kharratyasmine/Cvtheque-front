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
      last_name: {
        title: 'Nom' },
      first_name: {
        title: 'Prénom' },
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [
        { name: 'delete',
          title: '<i class="icon-trash width: 300px"></i> ', },
      ],
    },
  };
  data = [];
  nom: any;
  idAnnouncement: any;
  announcement: any;
  disabled: any;

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
        this.matDialog.open(elementDelete, {disableClose: true});
        break;
      default :
        this.fillDate(event.data);
        this.matDialog.open(event, {
          width: '800px',
          disableClose: true

        });
        break;
  }}
  addAnnouncement(idAnnouncement) {
    const announcement = new Announcement();
    announcement.nom = this.nom;
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
    this.service.deleteAnnouncement(this.announcement.announcement_id).subscribe(() => this.ngOnInit());
  }
  close() {
    this.nom = null;
    this.idAnnouncement = null;
    this.disabled = false;
    this.matDialog.closeAll();
  }
  private fillDate(data) {
    this.nom = data.last_name;
    this.idAnnouncement = data.announcement_id;
  }
}
