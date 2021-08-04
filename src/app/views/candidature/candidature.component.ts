import {Component, OnInit, TemplateRef} from '@angular/core';
import {CandidatureService} from '../../services/candidature.service';
import {MatDialog} from '@angular/material/dialog';
import {Candidature} from '../../model/candidature';

@Component({
  selector: 'app-candidature',
  templateUrl: './candidature.component.html',
  styleUrls: ['./candidature.component.scss']
})
export class CandidatureComponent implements OnInit {
  constructor( private service: CandidatureService, private matDialog: MatDialog  ) { }
settings = {
  columns: {
    candidate: {
      title: 'Nom candidat',
      valuePrepareFunction: (data) => {
        return `${data.last_name}  ${data.first_name}`;
      },
    },
    recruted_postion_id: {
      title: 'poste recruté'
    },
    last_modified_date: {
      title: 'Date de dernière modification'
    },
    last_modified_by: {
      title: 'Dernière modification par'
    },
  },
  actions: {
    add: false,
    edit: false,
    delete: false,
    position: 'right',
    custom: [
      {
        name: 'edit',
        title: '<i class="cil-pencil width: 300px"></i>  ',
      },
      {
        name: 'competance',
        title: '<i class="icon-pie-chart width: 300px"></i> ',
      },
      {
        name: 'delete',
        title: '<i class="icon-trash width: 300px"></i> ',
      },
    ],
  },
};
data = [];
  candidat_id: any;
  recruted_postion_id: any;
  last_modified_date: any;
  last_modified_by: any;
  idcandidature = null;
  condidature: any;
ngOnInit(): void {
  this.findAllCandidature();
}
  findAllCandidature() {
  this.service.findAllCandidature().subscribe(resultat => {
    console.log(resultat);
    this.data = resultat;
  });
}
openModal( element: any) {
  this.matDialog.open(element, {
    width: '500px',
    disableClose: true
  });
}
 chooseAction(event: any, element: any, elementDelete: any, elementCompetence: any) {
   this.condidature = event.data;
  switch (event.action) {
    case 'delete' :
      this.matDialog.open(elementDelete , {disableClose: true});
    break;
    case 'Competence' :
      this.matDialog.open(elementCompetence , {disableClose: true});
    break;
    default : this.matDialog.open(element , {disableClose: true}) ;
    break;
  }
}
addCandidature(idcandidature) {
  const candidature = new Candidature();
  candidature.candidat_id = this.candidat_id
  candidature.recruted_postion_id = this.recruted_postion_id;
  candidature.last_modified_date = this.last_modified_date;
  candidature.last_modified_by = this.last_modified_by;
  candidature.deleted = 0;
  if (idcandidature === null) {
    this.service.postCandidature(candidature).subscribe(() => {
      this.ngOnInit();
      this.close();
    });
  } else {
    candidature.id = idcandidature;
    this.service.updateCandidature(candidature, idcandidature).subscribe(() => {
      this.ngOnInit();
      this.close();
    });
  }
  }
deleteCandidature() {
  this.service.deleteCandidature(this.candidat_id).subscribe(resultat => {
    console.log(resultat);
  });
}
 close() {
    this.candidat_id = null;
    this.recruted_postion_id = null;
    this.last_modified_date = null;
    this.last_modified_by = null;
    this.matDialog.closeAll();
}
  private fillDate(data) {
    this.candidat_id = data.last_name;
    this.recruted_postion_id = data.first_name;
    this.last_modified_date = data.university.university_id;
    this.last_modified_by = data.ex_employers;
    this.idcandidature = data.candidate_id;
  }





}

