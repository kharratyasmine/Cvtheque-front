import {Component, Input, OnInit} from '@angular/core';
import {SuivisService} from '../../services/Suivis.service';
import {MatDialog} from '@angular/material/dialog';
import {Suivis} from '../../model/suivis';

@Component({
  selector: 'app-suivis',
  templateUrl: './Suivis.component.html',
  styleUrls: ['./Suivis.component.scss']
})
export class SuivisComponent implements OnInit {
  @Input()
  suivis: any;
  @Input()
  candidature: any;
  @Input()
  candidate: any;
  constructor(private service: SuivisService, private matDialog: MatDialog) { }
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
      },
      // Attacher_une_piece_jointe: {
      //   title: 'Attacher une piéce jointe'
      // },
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [
        { name: 'edit',
          title: '<i class="cil-pencil width: 300px"></i>  ', },
        {
          name: 'delete',
          title: '<i class="icon-trash width: 300px"></i> ',
        },
      ],
    },
  };
  Description_Action: any;
  Avancement: any;
  date_input: any;
  step_description: any;
  planned_date: any;
  status: any;
  poste: any;
  disabled: any;
  sequence: any;
  Statut: any;
  idCandidatureSteps = null;
    ngOnInit(): void {}
    openModal(element: any) {
    this.matDialog.open(element, {
      width: '800px'
    });
  }
    chooseAction(event: any, element: any, elementDelete: any) {
    this.suivis = event.data;
    switch (event.action) {
      case 'delete' :
        this.idCandidatureSteps = event.data.id_candidature_steps;
        this.matDialog.open(elementDelete, {disableClose: true});
        break;
      default :
        this.idCandidatureSteps = event.data.id_candidature_steps;
        this.fillDate(event.data);
        this.matDialog.open(element, {
          width: '800px',
          disableClose: true
        });
        break; } }
    addSuivis(idCandidatureSteps) {
      const suivis = new Suivis();
      delete this.candidate.candidatures;
      this.candidature.candidate = this.candidate;
      suivis.step_description = this.Description_Action;
      suivis.planned_date = this.date_input;
      suivis.status = this.status;
      suivis.sequence = this.sequence;
      suivis.candidature = this.candidature;
      suivis.deleted = 0;
      if (idCandidatureSteps === null) {
        this.service.postSuivis(suivis).subscribe(() => {
          this.findAllStepsByCandidature(); });
      } else {
        suivis.id_candidature_steps = idCandidatureSteps;
        this.service.updateSuivis(suivis, idCandidatureSteps).subscribe(() => {
          this.findAllStepsByCandidature(); });
      }
    }
    deleteSuivis() {
      this.service.deleteSuivis(this.idCandidatureSteps).subscribe(() => this.findAllStepsByCandidature());
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
      this.status = data.status;
      this.step_description = data.step_description ;
      this.sequence = data.sequence;
      this.planned_date = data.planned_date;
      this.candidature = data.candidature;
    }
    findAllStepsByCandidature() {
      this.service.findAllSuivisByIdCandidature(this.candidature.id, this.candidature.candidate.candidate_id)
        .subscribe(steps => { this.suivis = steps;
      });
    }
}






