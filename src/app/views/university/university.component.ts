import { Component, OnInit } from '@angular/core';
import {UniversityService} from '../../services/university.service';
import {University} from '../../model/university';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.scss']
})
export class UniversityComponent implements OnInit {
  constructor(private service: UniversityService, private matDialog: MatDialog) {
  }
  settings = {
    columns: {
      name: {
        title: 'Nom'
      },
      description: {
        title: 'Description'
      },
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [{
        name: 'delete',
        title: '<i class="icon-trash width: 300px"></i> ',
      },
        {
          name: 'edit',
          title: '<i class="icon-pencil width: 300px"></i> ',
        },
      ],
    },
  };
  data = [];
  name: any;
  university_id = null;
  description: any;
  deleted: any;
  title: string;
  ngOnInit(): void {
    this.findUniversities();
  }
  private findUniversities() {
    this.service.findUniversities().subscribe(resultat => {
      this.data = resultat;
    });
  }
  openModal(university: any) {
    this.title = 'Nouvelle';
    this.matDialog.open(university, {
      width: '800px',
      disableClose: true
    });
  }
  chooseAction(event: any, university: any, universityDelete: any ) {
    switch (event.action) {
      case 'delete' :
        this.matDialog.open(universityDelete, {disableClose: true});
        this.university_id = event.data.university_id;
        break;
      default :
        event.action === 'edit' ? this.university_id = event.data.university_id : this.university_id = null;
        this.title = 'Modifier';
        this.fillDate(event.data);
        this.matDialog.open(university, {
          width: '800px',
          disableClose: true
        });
        break;
    }
  }
  addUniversities(university_id) {
    const university = new University();
    university.name = this.name;
    university.description = this.description;
    university.deleted = 0;
    if (this.university_id === null) {
      this.service.postUniversities(university).subscribe(() => {
        this.ngOnInit();
        this.close();
      });
    } else {
      university.id = university_id;
      this.service.updateUniversities(university, university_id).subscribe(() => {
        this.ngOnInit();
        this.close();
      });
    }
  }
  deleteUniversities() {
    this.service.deleteUniversities(this.university_id).subscribe(() => {
      this.ngOnInit();
      this.close();
    });
  }
  close() {
    this.name = null;
    this.description = null;
    this.university_id = null;
    this.matDialog.closeAll();
  }
  private fillDate(data) {
    this.name = data.name;
    this.description = data.description;
  }
}
