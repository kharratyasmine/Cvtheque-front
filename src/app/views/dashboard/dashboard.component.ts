import { Component, OnInit } from '@angular/core';
import {SuivisService} from '../../services/suivis.service';
import {DashboardService} from '../../services/dashboard.service';
import {CondidatService} from '../../services/condidat.service';
import {Router} from '@angular/router';


@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  constructor(private stepService: SuivisService,
              private service: DashboardService,
              private router: Router) {}
  // settings = {
  //   columns: {
  //     post_name: {
  //       title: 'Position'
  //     },
  //     total: {
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
  listCandidature: any;
  candidature: any;
  total: any;
  post_name: any;
  ngOnInit(): void {
    this.findCandidaturebytechnique() ;
    this.findCandidaturebyorale();
    this.findCandidaturebyautre();
    this.findCandidaturebyrh();
    this.findCandidaturebytechnique();
    this.findcandidaturebypost();
  }
  findCandidaturebytechnique() {
    this.service.findCandidaturebytechnique().subscribe(resultat => {
      this.nbre = resultat;
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
  findcandidaturebypost() {
    this.service.findcandidaturebypost().subscribe(resultat => {
      this.listCandidature = resultat;
      resultat.forEach(element => console.log(element));
  });
  }
  findAllbystatus(): void {
    this.service.findAllbystatus().subscribe(resultat => {
    this.listCandidate = resultat;  });
    this.router.navigateByUrl('/candidat'); }
}
