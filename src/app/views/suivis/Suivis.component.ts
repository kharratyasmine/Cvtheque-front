import {Component, Input, OnInit} from '@angular/core';
import {SuivisService} from '../../services/Suivis.service';
import {MatDialog} from '@angular/material/dialog';
import {Suivis} from '../../model/suivis';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';

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
  heure: any;
  constructor(private service: SuivisService, private matDialog: MatDialog, private toastr: ToastrService, private route: ActivatedRoute) { }
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
    ngOnInit(): void {
      if(this.suivis.length === 0) {
        this.route.params.subscribe(obj => {
          if(obj.idCandidature !== undefined) {
            this.service.findAllSuivisByIdCandidature(obj.idCandidature, obj.id).subscribe(steps => {
              this.suivis = steps;
            });
          }
        })
      }
    }
    openModal(element: any) {
    this.matDialog.open(element, {
      width: '800px'
    });
  }
    chooseAction(event: any, element: any, elementDelete: any) {
   // this.suivis = event.data;
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
          this.clear();
          this.findAllStepsByCandidature();
        }, error => this.toastr.error('Un problème est survenu, veuillez contacter votre administrateur!', 'Erreur!', {timeOut: 1500}));
      } else {
        suivis.id_candidature_steps = idCandidatureSteps;
        this.service.updateSuivis(suivis, idCandidatureSteps).subscribe(() => {
          this.findAllStepsByCandidature();
          this.clear();
        }, error => this.toastr.error('Un problème est survenu, veuillez contacter votre administrateur!', 'Erreur!', {timeOut: 1500}));
      }
      const heure = `${this.heure.hour}h:${this.heure.minute} `;
      this.service.sendMail(this.candidate, this.sequence, this.candidature.announcement.post.post_name, this.date_input, heure, 'Invitation')
        .subscribe();
    }
    deleteSuivis() {
      this.service.deleteSuivis(this.idCandidatureSteps).subscribe(() => this.findAllStepsByCandidature());
    }
    clear() {
      this.status = null;
      this.Statut = null;
      this.disabled = false;
      this.idCandidatureSteps = null;
      this.step_description = null;
      this.Description_Action = null;
      this.Avancement = null;
      this.planned_date = null;
      this.date_input = null;
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
      }, error => this.toastr.error('Un problème est survenu, veuillez contacter votre administrateur!', 'Erreur!', {timeOut: 1500}));
    }
}






