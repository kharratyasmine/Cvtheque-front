import {Component,  OnInit} from '@angular/core';
import {SuivisService} from '../../services/Suivis.service';
import {MatDialog} from '@angular/material/dialog';
import {Suivis} from '../../model/suivis';

@Component({
  selector: 'app-suivis',
  templateUrl: './Suivis.component.html',
  styleUrls: ['./Suivis.component.scss']
})
export class SuivisComponent implements OnInit {
  private suivis: any;
  constructor(private service: SuivisService, private matDialog: MatDialog) {
  }
  settings = {
    columns: {
      planned_date: {
        title: 'Date de Suivi'
      },
      sequence: {
        title: 'Sequence'
      },
      step_description: {
        title: 'Description Action'
      },
      status: {
        title: 'Statut',
        valuePrepareFunction: (data) => {
          return data.Statut; },
      },
      Attacher_une_piece_jointe: {
        title: 'Attacher une piéce jointe'
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
  Description_Action: any;
  Avancement: any;
  date_input: any;
  step_description: any;
  planned_date: any;
  status: any;
  poste: any;
  candidature: any;
  disabled: any;
  sequence: any;
  Statut: any;
  idCandidatureSteps: any;
    ngOnInit(): void {
    this.findAllSuivis();
  }
    findAllSuivis() {
    this.service.findAllSuivis().subscribe(resultat => {
      this.data = resultat;
    });
  }
    openModal(element: any) {
    this.matDialog.open(element, {
      width: '800px'
    });
  }
    chooseAction(event: any, element: any, elementDelete: any) {
    this.suivis = event.data;
    switch (event.action) {
      case 'delete' :
        this.matDialog.open(elementDelete, {disableClose: true});
        break;
      default :
        this.idCandidatureSteps = event.data.id_candidature_steps;
        this.matDialog.open(element, {
          width: '800px',
          disableClose: true
        });
        break; }
  }
    addSuivis(idCandidatureSteps) {
      const suivis = new Suivis();
      suivis.step_description = this.Description_Action;
      suivis.Avancement = this.Avancement;
      suivis.planned_date = this.date_input;
      suivis.status = this.status;
      suivis.sequence = this.sequence;
      suivis.deleted = 0;
      if (idCandidatureSteps === null) {
        this.service.postSuivis(suivis).subscribe(() => {
          this.ngOnInit(); });
      } else {
        suivis.id = idCandidatureSteps;
        this.service.updateSuivis(suivis, idCandidatureSteps).subscribe(() => {
          this.ngOnInit(); });
      }
    }
    deleteSuivis() {
      this.service.deleteSuivis(this.suivis.suivis.id).subscribe(() => this.ngOnInit());
    }
    close() {
      this.status = null;
      this.Statut = null;
      this.disabled = false;
      this.idCandidatureSteps = null;
      this.step_description = null;
      this.Avancement = null;
      this.planned_date = null;
      this.candidature = null;
      this.sequence = null; }
    private fillDate(data) {
      this.status = data.statut;
      this.idCandidatureSteps = data.id_candidature_steps;
      this.step_description = data.Description_Action ;
      this.Avancement = data.Avancement;
      this.planned_date = data.date_input;
      this.poste = data.poste;
    }


}






