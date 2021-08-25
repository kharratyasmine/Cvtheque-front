import { Component, OnInit } from '@angular/core';
import {SuivisService} from '../../services/suivis.service';
import {DashboardService} from '../../services/dashboard.service';
import {CondidatService} from '../../services/condidat.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {CandidatureService} from '../../services/candidature.service';


@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {


  constructor(private stepService: SuivisService,
              private service: DashboardService,
              private candidatureService: CandidatureService,
              private router: Router,
              private toastr: ToastrService
              , private matDialog: MatDialog) {}
  // settings = {
  //   columns: {
  //     last_name: {
  //       title: 'Nom'
  //     },
  //     first_name: {
  //       title: 'Prénom'
  //     },
  //     mail: {
  //       title: 'E-mail'
  //     },
  //     diploma: {
  //       title: 'Diplôme',
  //       valuePrepareFunction: (data) => {
  //         return data.name;
  //       },
  //     },
  //     university: {
  //       title: 'Ecole',
  //       valuePrepareFunction: (data) => {
  //         return data.name;
  //       },
  //     },
  //     post_name: {
  //       title: 'Poste',
  //     },
  //     statut: {
  //       title: 'Statut',
  //     },
  //     candidatures: {
  //       title: 'Nombre de candidatures',
  //       valuePrepareFunction: (data) => {
  //         return data.length;
  //       },
  //     },
  //   },
  //   actions: {
  //     add: false,
  //     edit: false,
  //     delete: false,
  //     position: 'right',
  //   },
  // };
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
    this.findCandidaturebytechnique();
    this.findcandidaturebypost();
  }
  openModal(element: any) {
    this.matDialog.open(element, {
      width: '800px',
      disableClose: true
    });
  }

  chooseAction(event: any, element: any) {
    // this.condidat = event.data;
    // switch (event.action) {
    //   case 'element' :
    //     this.candidatureService.findCandidatureByCandidate(event.data.candidate_id).subscribe(list => {
    //       this.listcnd = list;
    //       this.matDialog.open(element , {disableClose: true});
    //       this.event = event;
    //     }, error => this.toastr.error('Un problème est survenu, veuillez contacter votre administrateur!', 'Erreur!', {timeOut: 1500}));
    //     break;
    // }
    switch (event.action) {
      case 'element' :
        this.candidatureService.findCandidatureByCandidate(event.data.candidate_id).subscribe(list => {this.listcnd = list;
        this.matDialog.open(element, {disableClose: true});
       });
        break;
  }
  }
  findCandidaturebytechnique() {
    this.service.findCandidaturebytechnique().subscribe(resultat => {
      this.nbre = resultat;
    }, error => this.toastr.error('Un problème est survenu, veuillez contacter votre administrateur!', 'Erreur!', {timeOut: 1500})); }
  findCandidaturebyorale() {
    this.service.findCandidaturebyorale().subscribe(resultat => {
      this.nbreorale = resultat;
    }, error => this.toastr.error('Un problème est survenu, veuillez contacter votre administrateur!', 'Erreur!', {timeOut: 1500})); }
  findCandidaturebyautre() {
    this.service.findCandidaturebyautre().subscribe(resultat => {
      this.nbreautre = resultat;
    }, error => this.toastr.error('Un problème est survenu, veuillez contacter votre administrateur!', 'Erreur!', {timeOut: 1500})); }
  findCandidaturebyrh() {
    this.service.findCandidaturebyrh().subscribe(resultat => {
      this.nbrerh = resultat;
    }, error => this.toastr.error('Un problème est survenu, veuillez contacter votre administrateur!', 'Erreur!', {timeOut: 1500})); }
  findcandidaturebypost() {
    this.service.findcandidaturebypost().subscribe(resultat => {
      this.listCandidature = resultat;
      resultat.forEach(element => console.log(element));
  }, error => this.toastr.error('Un problème est survenu, veuillez contacter votre administrateur!', 'Erreur!', {timeOut: 1500}));
  }
  findAllbystatus(): void {
    this.router.navigateByUrl('/candidat'); }
  close() {
    this.matDialog.closeAll();
  }
}
