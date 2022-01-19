import { Component, OnInit } from '@angular/core';
import {SuivisService} from '../../services/suivis.service';
import {DashboardService} from '../../services/dashboard.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {CandidatureService} from '../../services/candidature.service';


@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  result: any[] = [];
  constructor(private stepService: SuivisService,
              private service: DashboardService,
              private candidatureService: CandidatureService,
              private router: Router,
              private toastr: ToastrService
              , private matDialog: MatDialog) {}
  settings = {
    columns: {
      last_name: {
        title: 'Nom'
      },
      first_name: {
        title: 'Prénom'
      },
      mail: {
        title: 'E-mail'
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
    },
  };
  data = [];
  status: any;
  sequence: any;
  poste: any;
  nbre: any;
  nbreorale: any;
  nbrerh: any;
  nbreautre: any;
  listCandidate: any;
  listCandidature: any;
  candidature: any;
  total: any;
  post_name: any;
  event: any;
  cnd: any;
  listcnd: any;
  ngOnInit(): void {
    this.findCandidaturebytechnique() ;
    this.findCandidaturebyorale();
    this.findCandidaturebyautre();
    this.findCandidaturebyrh();
    this.findcandidaturebypost();
  }
  openModal(type: any ) {
    this.router.navigateByUrl('/candidat?statut=' + type);
  }
  findCandidaturebytechnique() {
    this.service.findCandidaturebytechnique().subscribe(resultat => {
      this.nbre = resultat;
    }, error => this.toastr.error('Un problème est survenu, veuillez contacter votre administrateur!', 'Erreur!', {timeOut: 1500}));
  }
  findCandidaturebyorale() {
    this.service.findCandidaturebyorale().subscribe(resultat => {
      this.nbreorale = resultat;
    }, error => this.toastr.error('Un problème est survenu, veuillez contacter votre administrateur!', 'Erreur!', {timeOut: 1500}));
  }
  findCandidaturebyautre() {
    this.service.findCandidaturebyautre().subscribe(resultat => {
      this.nbreautre = resultat;
    }, error => this.toastr.error('Un problème est survenu, veuillez contacter votre administrateur!', 'Erreur!', {timeOut: 1500}));
  }
  findCandidaturebyrh() {
    this.service.findCandidaturebyrh().subscribe(resultat => {
      this.nbrerh = resultat;
    }, error => this.toastr.error('Un problème est survenu, veuillez contacter votre administrateur!', 'Erreur!', {timeOut: 1500}));
  }

  findcandidaturebypost() {
    this.service.findcandidaturebypost().subscribe(resultat => {
      this.listCandidature = resultat;
    }, error => this.toastr.error('Un problème est survenu, veuillez contacter votre administrateur!', 'Erreur!', {timeOut: 1500}));
  }
  countCandidatureByPostName() {
  this.service.countCandidatureByPostName().subscribe(resultat => {
    this.listCandidature = resultat;
    resultat.forEach(element => console.log(element));
  }, error => this.toastr.error('Un problème est survenu, veuillez contacter votre administrateur!', 'Erreur!', {timeOut: 1500}));
  }

  close() {
    this.matDialog.closeAll();
    this.data = [];
  }

  putData(type: any) {
    switch (type) {
      case 'tech':   this.nbre.forEach(r => {
        this.data = this.data.concat({
          last_name: r.candidature.candidate.last_name,
          first_name: r.candidature.candidate.first_name,
          mail: r.candidature.candidate.mail
        });
      }); break;
      case 'autre':   this.nbreautre.forEach(r => {
        this.data = this.data.concat({
          last_name: r.candidature?.candidate?.last_name,
          first_name: r.candidature?.candidate?.first_name,
          mail: r.candidature?.candidate?.mail
        });
      }); break;
      case 'oral':   this.nbreorale.forEach(r => {
        this.data = this.data.concat({
          last_name: r.candidature.candidate.last_name,
          first_name: r.candidature.candidate.first_name,
          mail: r.candidature.candidate.mail
        });
      }); break;
      case 'rh':   this.nbrerh.forEach(r => {
        this.data = this.data.concat({
          last_name: r.candidature.candidate.last_name,
          first_name: r.candidature.candidate.first_name,
          mail: r.candidature.candidate.mail
        });
      }); break;
    }
  }

  navigate(postElement: any) {
    this.router.navigateByUrl('/candidat?id=' + postElement);
  }
}
