import { Component, OnInit } from '@angular/core';
import {CompetenceService} from '../../services/Competence.service';
import {MatDialog} from '@angular/material/dialog';
import {Competence} from '../../model/competence';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-competance',
  templateUrl: './competence.component.html',
  styleUrls: ['./competence.component.scss']
})
export class CompetenceComponent implements OnInit {
  constructor(private service: CompetenceService, private matDialog: MatDialog ) { }

  settings = {
    columns: {
      competence_name: {
        title: 'nom'
      },
      competence_group: {
        title: 'groupe'
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
          title: '<i class="icon-trash width: 300px"></i> ',
        },
        {
          name: 'edit',
          title: '<i class="cil-pencil width: 300px"></i>  ',
        },
      ],
    },
  };
  data = [];
  competence_group: any;
  competence_name: any;
  idCompetence: any;
  deleted: any;
  competence: any;
  ngOnInit(): void {
    this.findAllCompetence();
  }
  findAllCompetence() {
    this.service.findAllCompetence().subscribe(resultat => {
      this.data = resultat;
    });
  }
  openModal( element: any) {
    this.matDialog.open(element, {
      width: '800px',
      disableClose: true
    });
  }
  chooseAction(event: any, element: any, elementDelete: any) {
    this.competence = event.data;
    switch (event.action) {
      case 'delete' :
        this.matDialog.open(elementDelete, {disableClose: true});
        this.idCompetence = event.data.idCompetence;
        break;
      default :
        this.fillDate(event.data);
        this.matDialog.open(element, {disableClose: true}); break;
    }
  }
  addCompetence(idCompetence) {
    const competence = new Competence();
    competence.competence_name = this.competence_name;
    competence.competence_group = this.competence_group;
    competence.deleted = 0;
    if (idCompetence === null) {
      this.service.postCompetence(competence).subscribe(() => {
        this.ngOnInit();
        this.close();
      });
    } else {
      competence.id = idCompetence;
      this.service.updateCompetence(competence, idCompetence).subscribe(() => {
        this.ngOnInit();
        this.close();
      });
    }
  }
  deleteCompetence() {
      this.service.deleteCompetence(this.idCompetence).subscribe(r => {
      this.ngOnInit();
      this.close();
    });
  }
  close() {
    this.competence_name = null;
    this.competence_group = null;
    this.idCompetence = null;
    this.matDialog.closeAll();
  }
  private fillDate(data) {
    this.competence_name = data.competence_name;
    this.competence_group = data.competence_group;
    this.idCompetence = data.idCompetence; }


}



