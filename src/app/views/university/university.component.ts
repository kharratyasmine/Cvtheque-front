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
      nom: {
        title: 'Nom'
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
      ],
    },
  };
  data = [];
  nom: any;
  university_id: any;
  University: any;

  ngOnInit(): void {
    this.findUniversities();
  }
  private findUniversities() {
    this.service.findUniversities().subscribe(resultat => {
      this.data = resultat;
    });
  }
  openModal(element: any) {
    this.matDialog.open(element, {
      width: '800px',
      disableClose: true
    });
  }
  chooseAction(event: any, element: any, elementDelete: any ) {
    this.University = event.data;
    switch (event.action) {
      case 'delete' :
        this.matDialog.open(elementDelete, {disableClose: true});
        break;
      default :
        this.fillDate(event.data);
        this.matDialog.open(element, {
          width: '800px',
          disableClose: true
        });
        break;
    }
  }
  addUniversities(university_id) {
    const university = new University();
    university.nom = this.nom;
    university.idUniversities = this.university_id;
    if (university_id === null) {
      this.service.postUniversities(university).subscribe(() => {
        this.ngOnInit();
      });
    }   }
  deleteUniversities() {
    this.service.deleteUniversities(this.University.university_id).subscribe(() => this.ngOnInit());
  }
  close() {
    this.nom = null;
    this.university_id = null;
    this.matDialog.closeAll();
  }
  private fillDate(data) {
    this.nom = data.last_name;
    this.University = data.University;
    this.university_id = data.university_id;
  }
}
