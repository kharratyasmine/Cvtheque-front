import {Component, OnChanges, OnInit} from '@angular/core';
import {CondidatService} from '../../services/condidat.service';
import {MatDialog} from '@angular/material/dialog';
import {Condidat} from '../../model/condidat';
import {Suivis} from '../../model/suivis';
import {UniversityService} from '../../services/university.service';
import {DiplomaService} from '../../services/diploma.service';
import {SuivisService} from '../../services/Suivis.service';
import {Router} from '@angular/router';
import {GenericService} from '../../services/generic.service';
import {PostesService} from '../../services/postes.service';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms'
@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.scss']
})
export class CandidatComponent implements OnInit {
  private dataService: any;
 productForm: FormGroup;
  constructor(private service: CondidatService, private matDialog: MatDialog,
              private universityService: UniversityService,
              private router: Router,
              private diplomaService: DiplomaService,
              private stepService: SuivisService,
              private postService: PostesService,
              private genericService: GenericService,
              private fb: FormBuilder ) { }

 settings = {
    columns: {
      last_name: {
        title: 'Nom' },
      first_name: {
        title: 'Prénom' },
      mail: {
        title: 'E-mail' },
      diploma: {
        title: 'Diplôme',
        valuePrepareFunction: (data) => {
          return data.name; }, },
      university: {
        title: 'Ecole',
        valuePrepareFunction: (data) => {
          return data.name; }, },
      post_name: {
        title: 'Poste',
      },
      statut: {
        title: 'Statut',
        // valuePrepareFunction: (data) => {
        //   return data.statut; },
      },
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [
        { name: 'view',
        title: '<i class="cil-check-alt width: 300px"></i>  ', },
        { name: 'edit',
          title: '<i class="cil-pencil width: 300px"></i>  ', },
        { name: 'competence',
          title: '<i class="cil-library-add width: 300px"></i>  ', },
        { name: 'delete',
          title: '<i class="icon-trash width: 300px"></i> ', },
        { name: 'CV',
          title: '<i class="icon-cloud-download width: 300px"></i>', }
      ],
    },
  };
  data = [];
  prenom: any;
  nom: any;
  diplome: any;
  ecole: any;
  nombreDanneDexperience: any;
  Ex_employeurs: any;
  Motivation: any;
  email: any;
  gender: any;
  condidat: any;
  birth_date: any;
  diploma_date: any;
  identity: any;
  last_position: any;
  tel_fix: any;
  tel_mobile: any;
  listUniversity: any;
  listDiploma: any;
  statut: any;
  cv: any;
  idCandidate = null;
  deleted: any;
  disabled = false;
  title = '';
  listPoste: any;
  poste: any;
  competence: any;
  ngOnInit() {
    this.findAllCondidates();
    this.findAllUniversities();
    this.findAllDiplomas();
  }
  findAllCondidates() {
    this.service.findAllCondidates().subscribe(resultat => {
      resultat.forEach(res => {
        if (res.candidatures.length > 0) {
          this.postService.findposteByCandidatureAndCandidate(res.candidatures[0].id, res.candidate_id)
            .subscribe(data => {
              Object.assign(res, {post_name: data.post_name});
            });
          this.stepService.findAllSuivisByIdCandidature(res.candidatures[0].id, res.candidate_id)
            .subscribe(steps => {
              Object.assign(res, {statut: steps[steps.length - 1].sequence});
            });
        } else {
          Object.assign(res, {post_name: ''});
          Object.assign(res, {statut: ''});
        }
      });
      setTimeout(() => {
        this.data = resultat;
        }, 1000);
    });
  }
  openModal(element: any) {
    this.title = 'Nouvelle';
    this.matDialog.open(element, {
      width: '800px',
      disableClose: true
    });
  }

  chooseAction(event: any, element: any, elementDelete: any, elementCV: any, elementcompetence: any) {
    this.condidat = event.data;
    switch (event.action) {
      case 'delete' :
        this.matDialog.open(elementDelete, {disableClose: true});
        break;
        case 'competence' :
        this.matDialog.open(elementcompetence, {disableClose: true});
        break;
      case 'CV' :
        // this.matDialog.open(elementCV, {disableClose: true});
        // const iframe = document.createElement('frame');
        // iframe.style.display = 'none';
        // iframe.src = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
        // document.body.appendChild(iframe);
        // iframe.contentWindow.print();
        this.service.getDocument().subscribe(documentUrl => {
          window.open(documentUrl, '_blank');
        });
        break;
      default :
        this.title = 'Modifier';
        this.fillDate(event.data);
        event.action === 'view' ? this.disabled = true : this.disabled = false;
        this.genericService.addData(event.data);
        this.genericService.addDisabled(this.disabled);
        this.router.navigate(['/candidat/details']);
        break;
    }
  }
  addCandidate(idCandidate) {
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
    candidate.Statut = this.statut;
    candidate.deleted = 0;
    if (idCandidate === null) {
      this.service.postCondidat(candidate).subscribe(() => {
        this.ngOnInit();
        this.close();
      });
    } else {
      candidate.candidate_id = idCandidate;
      this.service.updateCondidat(candidate, idCandidate).subscribe(() => {

        this.ngOnInit();
        this.close();
      });
    }
  }
  deleteCandidate() {
    this.service.deleteCandidate(this.condidat.candidate_id).subscribe(() => this.ngOnInit());
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
  findUniversity(target: any) {
    console.log(target.value);
  }
  findDiploma(target: any) {
    console.log(target.value);
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
    this.identity = null;
    this.last_position = null;
    this.email = null;
    this.tel_fix = null;
    this.tel_mobile = null;
    this.cv = null;
    this.idCandidate = null;
    this.disabled = false;
    this.matDialog.closeAll();
  }
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
    this.tel_mobile = data.tel_mobile;
    this.cv = data.cv;
    this.idCandidate = data.candidate_id;
  }

  onSubmit() {
    console.log(this.productForm.value);
  }
  addCompetence() {
    this.competences().push(this.newCompetence());
  }
  competences(): FormArray {
    return this.productForm.get('competences') as FormArray
  }
newCompetence(): FormGroup {
    return this.fb.group({
      competence: '',
      evaluation: '',
    });
  }
  deleteCompetences(i: number) {
    this.competences().removeAt(i);
  }
}




