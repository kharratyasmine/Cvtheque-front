import {Component, OnInit} from '@angular/core';
import {CondidatService} from '../../services/condidat.service';
import {MatDialog} from '@angular/material/dialog';
import {Condidat} from '../../model/condidat';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UniversityService} from '../../services/university.service';
import {DiplomaService} from '../../services/diploma.service';
@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.scss']
})
export class CandidatComponent implements OnInit {
  productForm: FormGroup;
  constructor(private service: CondidatService, private matDialog: MatDialog,
              private universityService: UniversityService,
              private diplomaService: DiplomaService,
              private fb: FormBuilder ) {}
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
      diploma: { // ng smart table
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
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [{
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
          title: '<i class="icon-cloud-download width: 300px"></i>',
        }
      ],
    },
  };
  data = [];
  prenom: any;
  nom: any;
  diplome: any;
  selected: any;
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
  pdfSrc: any;

  ngOnInit(): void {
    this.findAllCondidates();
    this.findAllUniversities();
    this.findAllDiplomas();
  }

  findAllCondidates() {
    this.service.findAllCondidates().subscribe(resultat => {
      this.data = resultat;
    });
  }

  openModal(element: any) {
    this.matDialog.open(element, {
      width: '800px'
    });
  }

  chooseAction(event: any, element: any, elementDelete: any, elementCV: any) {
    this.condidat = event.data;
    switch (event.action) {
      case 'delete' :
        this.matDialog.open(elementDelete);
        break;
      case 'CV' :
        this.matDialog.open(elementCV);
        break;
      default :
        this.matDialog.open(element, {
          width: '800px'
        });
        break;
    }
  }
  addCondidat() {
    const condidat = new Condidat();
    condidat.last_name = this.nom;
    condidat.first_name = this.prenom;
    condidat.university = this.ecole;
    condidat.ex_employers = this.Ex_employeurs;
    condidat.motivation = this.Motivation;
    condidat.nb_experience = this.nombreDanneDexperience;
    condidat.gender = this.gender;
    condidat.birth_date = this.birth_date;
    condidat.diploma = this.diplome;
    condidat.diploma_date = this.diploma_date;
    condidat.identity = this.identity;
    condidat.last_position = this.last_position;
    condidat.mail = this.email;
    condidat.tel_fix = this.tel_fix;
    condidat.tel_mobile = this.tel_mobile;
    condidat.deleted = 0;
    console.log(condidat);
    // this.service.postCondidat(condidat).subscribe(r => {
    //   console.log(r);
    // });
    // this.close();

  }
  deleteCondidat() {
    this.service.deleteCondidat(this.condidat.id).subscribe(r => {
      console.log(this.condidat.id);
    });
  }
  CVCondidat() {
    this.pdfSrc="https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf" ;
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
  finduniversity(target: any) {
    console.log(target.value);
  }
  finddiploma(target: any) {
    console.log(target.value);
  }
}




