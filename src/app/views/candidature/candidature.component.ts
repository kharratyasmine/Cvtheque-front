import { Component, OnInit } from '@angular/core';
import {CandidatureService} from '../../services/candidature.service';
import {MatDialog} from '@angular/material/dialog';
import {candidature} from '../../model/candidature';
@Component({
  selector: 'app-candidature',
  templateUrl: './candidature.component.html',
  styleUrls: ['./candidature.component.scss']
})
export class CandidatureComponent implements OnInit {
  constructor( private service: CandidatureService, private matDialog: MatDialog) { }
settings = {
  columns: {
    candidat_id: {
      title: 'candidat_id'
    },
    recruted_postion_id: {
      title: 'recruted_postion_id'
    },
    last_modified_date: {
      title: 'last_modified_date'
    },
    last_modified_by: {
      title: 'last_modified_by'
    },
  },
  actions: {
    add: false,
    edit: false,
    delete: false,
    position: 'right',
    custom: [
      {
        name: 'delete',
        title: '<i class="cil-x width: 300px"></i> ',
      },
    ],
  },
};
data = [];
  candidat_id: any;
  recruted_postion_id: any;
  last_modified_date: any;
  last_modified_by: any;
ngOnInit(): void {
  this.findAllCandidature();
}
  findAllCandidature() {
  this.service.findAllCandidature().subscribe(resultat => {
    console.log(resultat);
    this.data = resultat;
  });
}
openModal( element: any) {
  this.matDialog.open(element, {
    width: '800px'
  });
}
chooseAction(event: any, element: any, elementDelete: any) {
  switch (event.action) {
    case 'delete' :  this.matDialog.open(elementDelete); break;
    default :  this.matDialog.open(element); break;
  }
}
addCandidature() {
  const candidature = new candidature();
  candidature.candidat_id = this.candidat_id;
  candidature.recruted_postion_id = this.recruted_postion_id;
  candidature.last_modified_date = this.last_modified_date;
  candidature.last_modified_by = this.last_modified_by;
  console.log(candidature);
  this.service.postCandidature(candidature).subscribe(resultat =>{
      console.log(resultat);
    }
  ); }
deleteCandidature() {
  this.service.deleteCandidature(this.candidature.id).subscribe(resultat =>{
    console.log(resultat);
  });
}
}
