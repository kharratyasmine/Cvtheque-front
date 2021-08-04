import { Component, OnInit } from '@angular/core';
import {PostesService} from '../../services/postes.service';
import {MatDialog} from '@angular/material/dialog';
import {Postes} from '../../model/postes';
@Component({
  selector: 'app-postes',
  templateUrl: './postes.component.html',
  styleUrls: ['./postes.component.scss']
})
export class PostesComponent implements OnInit {
  constructor(private service: PostesService, private matDialog: MatDialog) { }
  settings = {
    columns: {
      Date_de_publication: {
        title: 'Date de publication' },
      poste: {
        title: 'poste' },
      candidatures: {
        title: 'candidatures' },
      statut_publication: {
        title: 'statut_publication',
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
          name: 'delete',
          title: '<i class="icon-trash width: 300px"></i> ',
        },
      ],
    },
  };
  data = [];
  post: any;
  Date_de_publication: any;
  statut_publication: any;
  candidatures: any;
  id_Post: any;

  ngOnInit(): void {
    this.findAllPostes();
  }
  private findAllPostes() {
    this.service.findAllPostes().subscribe(resultat => {
      this.data = resultat; } ); }
  openModal(element: any) {
    this.matDialog.open(element, {
      width: '800px',
      disableClose: true
    });
  }
  chooseAction(event: any, element: any, elementDelete: any ) {
    this.post = event.data;
    switch (event.action) {
      case 'delete' :
        this.matDialog.open(elementDelete, {disableClose: true});
        break;
      default :
        this.fillDate(event.data);
        this.matDialog.open(element, {
          width: '800px',
          disableClose: true
        });
        break;
    }
  }
  addPostes(id_post) {
    const post = new Postes();
    post.poste = this.post;
    post.Date_de_publication = this.Date_de_publication;
    post.statut_publication = this.statut_publication;
    post.candidatures = this.candidatures;
    post.id_Post = this.id_Post;
    if (id_post === null) {
      this.service.postPostes(post).subscribe(() => {
        this.ngOnInit();
        this.close();
      });
    } else {
      post.id = id_post;
      this.service.updateCondidat(post, id_post).subscribe(() => {
        this.ngOnInit();
        this.close();
      }); } }
  deletePostes() {
    this.service.deletePostes(this.post.id_post).subscribe(() => this.ngOnInit());
  }
  close() {
  this.post = null;
  this.Date_de_publication = null;
  this.statut_publication = null;
  this.candidatures = null;
  this.id_Post = null;
  this.matDialog.closeAll();
}
private fillDate(data) {
  this.post = data.poste;
  this.Date_de_publication = data.Date_de_publication;
  this.statut_publication = data.statut_publication;
  this.candidatures = data.candidatures;
  this.id_Post = data.id_Post;
}
}

