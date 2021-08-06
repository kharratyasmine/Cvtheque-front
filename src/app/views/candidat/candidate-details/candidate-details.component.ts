import {Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {CondidatService} from '../../../services/condidat.service';
import {PostesService} from '../../../services/postes.service';
import {AnnouncementService} from '../../../services/announcement.service';
import {Condidat} from '../../../model/condidat';
import {GenericService} from '../../../services/generic.service';
import {UniversityService} from '../../../services/university.service';
import {DiplomaService} from '../../../services/diploma.service';
import {CandidatureService} from '../../../services/candidature.service';
import {MatDialog} from '@angular/material/dialog';
import {SuivisService} from '../../../services/suivis.service';
@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.scss']
})
export class CandidateDetailsComponent implements OnInit {
  suivis: any[] = [];
  constructor(private service: CondidatService,
              private postesService: PostesService,
              private genericService: GenericService,
              private universityService: UniversityService,
              private diplomaService: DiplomaService,
              private announcementService: AnnouncementService,
              private candidatureService: CandidatureService,
              private matDialog: MatDialog,
              private suivisService: SuivisService) { }
  @ViewChild(MatAccordion) accordion: MatAccordion;
  settings = {
    columns: {
      piece_jointe: {
        title: 'Piece jointe'
      },
      Date: {
        title: 'Date'
      },
      type_de_piece_jointe: {
        title: 'Type de piece jointe'
      },
      Type: {
        title: 'Type'
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
      ],
    },
  };
  data = [];
  gender: any;
  disabled = false;
  prenom: any;
  birth_date: any;
  email: any;
  diplome: any;
  diploma_date: any;
  listPoste: any;
  Motivation: any;
  last_position: any;
  Ex_employeurs: any;
  nombreDanneDexperience: any;
  listAnnouncement: any;
  listePostes: any;
  listUniversity: any;
  listDiploma: any;
  ecole: any;
  tel_mobile: any;
  tel_fix: any;
  nom: any;
  cv: any;
  identity: any;
  idCandidate: any;
  step_description: any;
  Avancement: any;
  planned_date: any;
  status: any;
  poste: any;
  candidature: any;
  sequence: any;
  Description_Action: any;
  date_input: any;
  Statut: any;
  id_candidature_steps: any;
  ngOnInit(): void {
    this.genericService.subscribeMessage.subscribe((data: any) => {
      this.genericService.subscribeDisabledData.subscribe((b: boolean) => {
        this.candidatureService.findCandidatureByCandidate(data.candidate_id).subscribe(result => {
          this.candidature = result;
          this.suivisService.findAllSuivisByIdCandidature(result.id, data.candidate_id).subscribe(steps => {
            this.suivis = steps;
            this.fillDate(data);
            this.disabled = b;
          });
        });
      });
    });
    this.findAllPostes();
    this.findAllCandidature();
    this.findAllUniversities();
    this.findAllDiplomas();
  }
  private findAllPostes() {
    this.postesService.findAllPostes().subscribe(data => {
      this.listPoste = data;
    });
  }
  findAnnouncement(target: any) {
    console.log(target.value);
  }
  findPoste(target: any) {
    console.log(target.value); }
  private findAllCandidature() {
    this.candidatureService.findAllCandidature().subscribe(data => {}
    ); }
  updateCandidate() {
    const candidate = new Condidat();
    candidate.last_name = this.nom;
    candidate.first_name = this.prenom;
    candidate.university = this.listUniversity.find(x => x.university_id === this.ecole);
    candidate.ex_employers = this.Ex_employeurs;
    candidate.motivation = this.Motivation;
    candidate.nb_experience = this.nombreDanneDexperience;
    candidate.gender = this.gender;
    candidate.birth_date = this.birth_date;
    candidate.diploma = this.listDiploma.find(x => x.diploma_id === this.diplome);
    candidate.diploma_date = this.diploma_date;
    candidate.identity = this.identity;
    candidate.last_position = this.last_position;
    candidate.mail = this.email;
    candidate.tel_fix = this.tel_fix;
    candidate.tel_mobile = this.tel_mobile;
    candidate.cv = this.cv;
    candidate.Statut = null;
    candidate.deleted = 0;
    candidate.id = this.idCandidate;
    this.service.updateCondidat(candidate, this.idCandidate).subscribe(() => {
      this.announcementService.findAnnouncement(this.listPoste.find(post => post.id_post === this.poste))
        .subscribe(result => {
          const candidature: any = {
            candidate: candidate,
            announcement: result,
            candidature_steps: null,
          };
          this.candidatureService.postCandidature(candidature).subscribe(() => {
            this.ngOnInit();
          });
        });
      });
  }
  private findAllUniversities() {
    this.universityService.findUniversities().subscribe(data => {
      this.listUniversity = data;
    });
  }
  private findAllDiplomas() {
    this.diplomaService.findDiplomas().subscribe(data => {
      this.listDiploma = data;
    });
  }
  openModal(element: any) {
    this.matDialog.open(element, {
      width: '800px',
      disableClose: true
    });
  }
  chooseAction(event: any, element: any, elemDelete: any) {
    switch (event.action) {
      case 'delete' :
        this.matDialog.open(elemDelete, {disableClose: true});
        break;
      default :
        this.id_candidature_steps = event.data.id_candidature_steps;
        this.fillDate(event.data);
        this.matDialog.open(element, {
          width: '800px',
          disableClose: true
        });
        break;
    }
  }
  close() {
    this.nom = null;
    this.prenom = null;
    this.ecole = null;
    this.Ex_employeurs = null;
    this.Motivation = null;
    this.nombreDanneDexperience = null;
    this.gender = null;
    this.birth_date = null;
    this.diplome = null;
    this.diploma_date = null;
    this.last_position = null;
    this.email = null;
    this.tel_fix = null;
    this.tel_mobile = null;
    this.cv = null;
    this.status = null;
    this.Statut = null;
    this.disabled = false;
    this.identity = null;
    this.idCandidate = null;
    this.id_candidature_steps = null;
    this.step_description = null;
    this.Avancement = null;
    this.planned_date = null;
    this.candidature = null;
    this.sequence = null; }
  private fillDate(data) {
    this.nom = data.last_name;
    this.prenom = data.first_name;
    this.ecole = data.university.university_id;
    this.Ex_employeurs = data.ex_employers;
    this.Motivation = data.motivation;
    this.nombreDanneDexperience = data.nb_experience;
    this.gender = data.gender;
    this.birth_date = data.birth_date;
    this.diplome = data.diploma.diploma_id;
    this.diploma_date = data.diploma_date;
    this.identity = data.identity;
    this.last_position = data.last_position;
    this.email = data.mail;
    this.tel_fix = data.tel_fix;
    this.tel_mobile = data.tel_mobile ;
    this.cv = data.cv;
    this.status = data.statut;
    this.idCandidate = data.candidate_id;
    this.step_description = data.Description_Action ;
    this.Avancement = data.Avancement;
    this.planned_date = data.date_input;
    this.poste = data.poste;
  }
}
