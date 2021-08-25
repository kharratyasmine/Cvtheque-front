import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CondidatService} from '../../services/condidat.service';
import {MatDialog} from '@angular/material/dialog';
import {Condidat} from '../../model/condidat';
import {UniversityService} from '../../services/university.service';
import {DiplomaService} from '../../services/diploma.service';
import {SuivisService} from '../../services/Suivis.service';
import {Router} from '@angular/router';
import {GenericService} from '../../services/generic.service';
import {PostesService} from '../../services/postes.service';
import {CompetenceService} from '../../services/competence.service';
import {NgxSpinnerService} from 'ngx-bootstrap-spinner';
import {Candidature} from '../../model/candidature';
import {AnnouncementService} from '../../services/announcement.service';
import {CandidatureService} from '../../services/candidature.service';
import {ToastrService} from 'ngx-toastr';
import {Ng2SmartTableComponent} from 'ng2-smart-table';


@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.scss']
})
export class CandidatComponent implements OnInit, AfterViewInit {
  event: any;
  base64: string;
@ViewChild('smart') smart: Ng2SmartTableComponent;
  constructor(private service: CondidatService, private matDialog: MatDialog,
              private universityService: UniversityService,
              private router: Router,
              private announcementService: AnnouncementService,
              private candidatureService: CandidatureService,
              private postesService: PostesService,
              private diplomaService: DiplomaService,
              private stepService: SuivisService,
              private postService: PostesService,
              private genericService: GenericService,
              private competenceService: CompetenceService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService
  ) {}

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
      },
      diploma: {
        title: 'Diplôme',
        valuePrepareFunction: (data) => {
          return data.name;
        },
      },
      university: {
        title: 'Ecole',
        valuePrepareFunction: (data) => {
          return data.name;
        },
      },
      post_name: {
        title: 'Poste',
      },
      statut: {
        title: 'Statut',
      },
      candidatures: {
        title: 'Nombre de candidatures',
        valuePrepareFunction: (data) => {
          return data.length;
        },
      },
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [
        {
          name: 'view',
          title: '<i class="cil-check-alt width: 300px"></i>  ',
        },
        {
          name: 'edit',
          title: '<i class="cil-pencil width: 300px"></i>  ',
        },
        {
          name: 'delete',
          title: '<i class="icon-trash width: 300px"></i> ',
        },
        {
          name: 'CV',
          title: '<i class="icon-cloud-download margin width: 300px"></i>',
        },
        {
          name: 'Candidature',
          title: '<i class="icon-plus width: 300px"></i>',
        }
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
  poste: any;
  competence: any;
  blob: any;
  currentCv = '';
  listPoste: any;
  listAnnouncement: any;
  announcement: any;
  hidden = false;
  cnd: any;
  listcnd: any;

  ngOnInit() {
    // this.toastr.error('Un problème est survenu, veuillez contacter votre administrateur!', 'Erreur!', {timeOut: 1500});
    this.spinner.show();
    this.findAllCondidates();
    this.findAllUniversities();
    this.findAllDiplomas();
    this.findAllPosts();
  }
  findAllCondidates() {
    this.service.findAllCondidates().subscribe(resultat => {
      resultat.forEach(res => {
        if (res.candidatures.length > 0) {
          this.postService.findposteByCandidatureAndCandidate(res.candidatures[res.candidatures.length - 1].id, res.candidate_id)
            .subscribe(data => {
              this.stepService.findAllSuivisByIdCandidature(res.candidatures[res.candidatures.length - 1].id, res.candidate_id)
                .subscribe(steps => {
                  Object.assign(res, {post_name: data.post_name});
                  Object.assign(res, {statut: steps[steps.length - 1]?.sequence});
                });
            }, error => this.toastr.error('Un problème est survenu, veuillez contacter votre administrateur!', 'Erreur!', {timeOut: 1500}));
        } else {
          Object.assign(res, {post_name: ''});
          Object.assign(res, {statut: ''});
        }
      });
      setTimeout(() => {
        this.data = resultat;
        this.spinner.hide();
      }, 4000);
    }, error => this.toastr.error('Un problème est survenu, veuillez contacter votre administrateur!', 'Erreur!', {timeOut: 1500}));
  }

  openModal(element: any) {
    this.title = 'Nouvelle';
    this.matDialog.open(element, {
      width: '800px',
      disableClose: true
    });
  }

  chooseAction(event: any, element: any, elementDelete: any, elementCV: any, elementCandidature: any, choice: any) {
    this.condidat = event.data;
    switch (event.action) {
      case 'delete' :
        this.matDialog.open(elementDelete, {disableClose: true});
        break;
      case 'CV' :
        this.spinner.show();
        this.service.findCv(event.data.candidate_id).subscribe((cv: any) => {
          this.currentCv = cv.cv;
          this.matDialog.open(elementCV, {height: '90%', width: '70%'});
          this.spinner.hide();
        }, error => this.toastr.error('Un problème est survenu, veuillez contacter votre administrateur!', 'Erreur!', {timeOut: 1500}));
        break;
      case 'Candidature' :
        this.findAllPosts();
        this.event = event;
        this.matDialog.open(elementCandidature, { width: '800px'});
        break;
      default :
        this.title = 'Modifier';
        this.candidatureService.findCandidatureByCandidate(event.data.candidate_id).subscribe(list => {
          this.listcnd = list;
          this.matDialog.open(choice, {disableClose: true});
          this.event = event;
        }, error => this.toastr.error('Un problème est survenu, veuillez contacter votre administrateur!', 'Erreur!', {timeOut: 1500}));
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
      this.service.postCondidat(candidate).subscribe((cdt: any) => {
        this.addCandidature(cdt, this.announcement);
        this.ngOnInit();
        this.close();
      }, error => this.toastr.error('Un problème est survenu, veuillez contacter votre administrateur!', 'Erreur!', {timeOut: 1500}));
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
    }, error => this.toastr.error('Un problème est survenu, veuillez contacter votre administrateur!', 'Erreur!', {timeOut: 1500}));
  }
 private findAllDiplomas() {
    this.diplomaService.findDiplomas().subscribe(data => {
      this.listDiploma = data;
    }, error => this.toastr.error('Un problème est survenu, veuillez contacter votre administrateur!', 'Erreur!', {timeOut: 1500}));
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
    this.hidden = false;
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
  getBase64(blob: any) {
    const file = blob.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.cv = reader.result;
      console.log(this.cv);
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
 }
  addCandidature(candidate: any, announcement: any) {
    const candidature = new Candidature();
    candidature.candidate = candidate;
    candidature.announcement = announcement;
    candidature.deleted = false;
    this.candidatureService.postCandidature(candidature).subscribe();
  }
  selectedPost() {
    const currentPost = this.listPoste.find(p => p.id_post === this.poste);
    this.announcementService.findAnnouncement(currentPost).subscribe(announcements => {
      this.listAnnouncement = announcements;
      this.hidden = true;
    }, error => this.toastr.error('Un problème est survenu, veuillez contacter votre administrateur!', 'Erreur!', {timeOut: 1500}));
  }
  private findAllPosts() {
    this.postService.findAllPostes().subscribe(posts => {
      this.listPoste = posts;
    }, error => this.toastr.error('Un problème est survenu, veuillez contacter votre administrateur!', 'Erreur!', {timeOut: 1500}));
  }

  selectedCandidature() {
    this.fillDate(this.event.data);
    this.event.action === 'view' ? this.disabled = true : this.disabled = false;
    this.genericService.addData(this.cnd);
    this.genericService.addDisabled(this.disabled);
    this.router.navigate(['/candidat/details/' + this.event.data.candidate_id]);
  }

  ngAfterViewInit(): void {
    this.smart.filter('query');
  }

  download(currentCv: string) {
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = currentCv;
    a.download = 'Cv.pdf';
    a.click();
    a.remove();
  }

  // print(currentCv: string) {
  //   window.applicationC
  //   window.print();
  // }
}


