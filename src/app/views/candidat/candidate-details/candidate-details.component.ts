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
import {Candidature} from '../../../model/candidature';
@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.scss']
})
export class CandidateDetailsComponent implements OnInit {
  constructor(private service: CondidatService,
              private postesService: PostesService,
              private genericService: GenericService,
              private universityService: UniversityService,
              private diplomaService: DiplomaService,
              private announcementService: AnnouncementService,
              private candidatureService: CandidatureService, ) { }
  @ViewChild(MatAccordion) accordion: MatAccordion;
  settings = {
    columns: {
      Date_de_Suivi: {
        title: 'Date de Suivi'
      },
      Avancement: {
        title: 'Avancement'
      },
      Description_Action: {
        title: 'Description Action'
      },
      Attacher_une_piece_jointe: {
        title: 'Attacher une piéce jointe'
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
          title: '<i class="cil-x width: 300px"></i> ',
        },
      ],
    },
  };
  setting = {
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
          title: '<i class="cil-x width: 300px"></i> ',
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
  Poste: any;
  ecole: any;
  tel_mobile: any;
  tel_fix: any;
  nom: any;
  cv: any;
  identity: any;
  idCandidate: any;
  ngOnInit(): void {
    this.genericService.subscribeMessage.subscribe((data: any) => {
      this.genericService.subscribeDisabledData.subscribe((b: boolean) => {
        this.fillDate(data);
        this.disabled = b;
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
  private findAllCandidature() {}
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
    this.disabled = false;
    this.identity = null;
    this.idCandidate = null;
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
    candidate.id = this.idCandidate;
    this.service.updateCondidat(candidate, this.idCandidate).subscribe(() => {
      this.announcementService.findAnnouncement(this.listPoste.find(post => post.id_post === this.Poste))
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
    this.idCandidate = data.candidate_id;
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
}
