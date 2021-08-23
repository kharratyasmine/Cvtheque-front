import { Component, OnInit } from '@angular/core';
import {SuivisService} from '../../services/suivis.service';
import {DashboardService} from '../../services/dashboard.service';
import {CondidatService} from '../../services/condidat.service';


@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  constructor(private stepService: SuivisService,
              private service: DashboardService ) {}
  // settings = {
  //   columns: {
  //     sequence: {
  //       title: 'Status'
  //     },
  //     nbre: {
  //       title: 'Nombres'
  //     },
  //   },
  //   actions: {
  //     add: false,
  //     edit: false,
  //     delete: false,
  //     position: 'right'},
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
  ngOnInit(): void {
    this.findCandidaturebytechnique() ;
    this.findCandidaturebyorale();
    this.findCandidaturebyautre();
    this.findCandidaturebyrh();
    this.findCandidaturebytechnique();
  }

  findCandidaturebytechnique() {
    this.service.findCandidaturebytechnique().subscribe(resultat => {
      this.nbre = resultat;
    }); }
 findAllbyrh() {
    this.service.findAllbyrh().subscribe(resultat => {
      this.listCandidate = resultat;
    }); }

  findCandidaturebyorale() {
    this.service.findCandidaturebyorale().subscribe(resultat => {
      this.nbreorale = resultat;
    }); }
  findCandidaturebyautre() {
    this.service.findCandidaturebyautre().subscribe(resultat => {
      this.nbreautre = resultat;
    }); }
  findCandidaturebyrh() {
    this.service.findCandidaturebyrh().subscribe(resultat => {
      this.nbrerh = resultat;
    }); }
}
