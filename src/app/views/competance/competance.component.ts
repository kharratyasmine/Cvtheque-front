import { Component, OnInit } from '@angular/core';
import {CompetanceService} from '../../services/Competance.service';
import {MatDialog} from '@angular/material/dialog';
import {Competance} from '../../model/competance';

@Component({
  selector: 'app-competance',
  templateUrl: './competance.component.html',
  styleUrls: ['./competance.component.scss']
})
export class CompetanceComponent implements OnInit {

  constructor(private service: CompetanceService, private matDialog: MatDialog) { }
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
          title: '<i class="cil-x width: 300px"></i> ',
        },
      ],
    },
  };
  data = [];
  competence_group: any;
  competence_name: any;
  ngOnInit(): void {
    this.findAllCompetence();
  }
  findAllCompetence() {
    this.service.findAllCompetance().subscribe(resultat => {
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
  addCompetance() {
    const competance = new Competance();
    competance.competence_name = this.competence_name;
    competance.competence_group = this.competence_group;
    console.log(competance);
    this.service.postCompetance(competance).subscribe(resultat =>{
      console.log(resultat);
      }
    ); }
  deleteCompetance() {
    this.service.deleteCompetance(this.competance.id).subscribe(resultat =>{
      console.log(resultat);
    });
  }
}



