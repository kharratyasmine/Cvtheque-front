import {Component, OnInit} from '@angular/core';
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
import {CompetenceService} from '../../../services/competence.service';
import {AvantagesService} from '../../../services/avantages.service';
import {ActivatedRoute} from '@angular/router';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-bootstrap-spinner';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.scss']
})
export class CandidateDetailsComponent implements OnInit {
  suivis: any[] = [];
  avantage: any[] = [];
  competence: any[] = [];
  result: any;
  productForm: FormGroup;
  ProductForm: FormGroup;
  listComptece: any;
  listAvantage: any;
  advantage_group: null;
  competence_group: null;


constructor(private service: CondidatService,
              private postesService: PostesService,
              private genericService: GenericService,
              private universityService: UniversityService,
              private diplomaService: DiplomaService,
              private announcementService: AnnouncementService,
              private candidatureService: CandidatureService,
              private matDialog: MatDialog,
              private router: ActivatedRoute,
              private competenceService: CompetenceService,
              private avantagesServices: AvantagesService,
              private suivisService: SuivisService,
            private spinner: NgxSpinnerService,
              private fb: FormBuilder, ) {
  this.productForm = this.fb.group({
    competences: this.fb.array([])
  });
  this.ProductForm = this.fb.group({
    avantages: this.fb.array([])
  });
}
  setting = {
    columns: {
      competence: { title: 'Competence',
        valuePrepareFunction: (data) => {
          return data.competence_name; }
      },
      evaluation: { title: 'Evaluation' }, },
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
  setings = {
    columns: {
      advantage: { title: 'Avantage',
        valuePrepareFunction: (data) => {
          return data.advantage_name; }
      },
    evaluation: { title: 'Evaluation' }, },
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
  competence_name: any;
  advantage_name: any;
  Statut: any;
  id_candidature_steps: any;
  idCompetence: any;
  idAdvantage: any;
  ListCompetence: any;
  ListAvantage: any;
  post_name: any;
  poste_name: any;
  ngOnInit(): void {
    this.spinner.show();
    this.router.params
      .subscribe((queryParams: any) => {
        this.service.findById(queryParams['id']).subscribe(res => {
          this.result = res;
          this.genericService.subscribeDisabledData.subscribe((b: boolean) => {
            this.genericService.subscribeMessage.subscribe(result => {
              this.candidature = result;
              if (result !== null) {
                this.postesService.findposteByCandidatureAndCandidate(this.candidature.id, this.result.candidate_id)
                  .subscribe(post => this.poste_name = post.post_name);
                this.suivisService.findAllSuivisByIdCandidature(this.candidature.id, this.result.candidate_id).subscribe(steps => {
                  this.suivis = steps;
                });
              }
              this.fillDate(this.result);
              if (this.candidature !== undefined && this.candidature !== null) {
                this.findCompetences();
                this.findAvantages();
              }
              this.disabled = b;
              this.spinner.hide();
            });
          });
        });
      });
    this.findAllPostes();
    this.findAllUniversities();
    this.findAllDiplomas();
    this.findAllCompetences();
    this.findAllAvantages();
  }
  private findAllPostes() {
    this.postesService.findAllPostes().subscribe(data => {
      this.listPoste = data;
    });
  }
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
    candidate.candidate_id = this.idCandidate;
    this.service.updateCondidat(candidate, this.idCandidate).subscribe(() => { this.ngOnInit(); });
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
  findAllCompetences() {
    this.competenceService.findAllCompetence().subscribe(data => {
      this.ListCompetence = data;
    });
  }
  findAllAvantages() {
    this.avantagesServices.findAllAvantages().subscribe(data => {
      this.ListAvantage = data;
    });
  }
  openModal(element: any) {
    this.matDialog.open(element, {
      width: '800px',
      disableClose: true
    });
  }

  chooseAction(event: any, element: any, elementDelete: any) {
    switch (event.action) {
      case 'delete' :
        this.matDialog.open(elementDelete, {disableClose: true});
        break;
      default :
        this.idCompetence = event.data.idCompetence;
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
    this.idCompetence = null;
    this.idAdvantage = null;
    this.step_description = null;
    this.Avancement = null;
    this.planned_date = null;
    this.candidature = null;
    this.sequence = null;
    this.advantage_name = null;
    this.advantage_group = null;
    this.idAdvantage = null;
    this.competence_name = null;
    this.competence_group = null;
    this.idCompetence = null;
    this.matDialog.closeAll(); }
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
    this.advantage_name = data.advantage_name;
    this.advantage_group = data.advantage_group;
    this.competence_name = data.competence_name;
    this.competence_group = data.competence_group;
  }
  findCompetences() {
    this.spinner.show();
    this.competenceService.findAllCompetenceByCandidature(this.candidature.id, this.idCandidate).subscribe(res => {
      this.listComptece = res;
      this.productForm = this.fb.group({
        competences: this.fb.array([])
      });
      this.spinner.hide();
    });
  }
  onSubmit() {
    this.productForm.value.competences.forEach(competence => {
     const comp = {
       candidate: this.result,
       competence: competence.competence,
       evaluation: competence.evaluation,
       candidatureId: this.candidature.id,
     };
      this.competenceService.postCompetenceCandidature(comp).subscribe(() => {
        this.findCompetences();
      });
    });
   }
  addCompetence() {
    this.competences().push(this.newCompetence()); }
  competences(): FormArray {
    return this.productForm.get('competences') as FormArray; }
  newCompetence(): FormGroup {
    return this.fb.group({
      competence: '',
      evaluation: '',
    }); }
  deleteCompetences(i: number) {
    this.competences().removeAt(i); }
  findAvantages() {
    this.spinner.show();
    this.avantagesServices.findAllAvantageByCandidature(this.candidature.id, this.idCandidate).subscribe(res => {
      this.listAvantage = res;
      this.ProductForm = this.fb.group({
        avantages: this.fb.array([])
      });
      this.spinner.hide();
    });
  }
  OnSubmit() {
    this.ProductForm.value.avantages.forEach(avantage => {
      const avan = {
        candidate: this.result,
        advantage: avantage.avantage,
        evaluation: avantage.evaluation,
        candidatureId: this.candidature.id,
      };
      this.avantagesServices.postAvantageCandidature(avan).subscribe(() => {
        this.findAvantages();
      });
    });
  }
  addAvantage() {
    this.avantages().push(this.newAvantage()); }
  avantages(): FormArray {
    return this.ProductForm.get('avantages') as FormArray; }
  newAvantage(): FormGroup {
    return this.fb.group({
      avantage: '',
      evaluation: '',
    }); }
 deleteAvanatges(i: number) {
    this.avantages().removeAt(i); }
  deleteAvantage() {
    this.avantagesServices.deleteAvantage(this.idAdvantage).subscribe(r => {
      this.ngOnInit();
      this.close();
    } );
  }
  deleteCompetence() {
    this.competenceService.deleteCompetence(this.idCompetence).subscribe(r => {
      this.ngOnInit();
      this.close();
    });
  }

}
