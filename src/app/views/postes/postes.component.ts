import { Component, OnInit } from '@angular/core';
import {PostesService} from '../../services/postes.service';
import {MatDialog} from '@angular/material/dialog';
import {Postes} from '../../model/postes';
import {any} from 'codelyzer/util/function';

@Component({
  selector: 'app-postes',
  templateUrl: './postes.component.html',
  styleUrls: ['./postes.component.scss']
})
export class PostesComponent implements OnInit {
  constructor(private service: PostesService, private matDialog: MatDialog) { }
  settings = {
    columns: {
      post_name: {
        title: 'Nom'
      },
      description: {
        title: 'Description'
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
 data = [] ;
  id_post: null ;
  post_name: any ;
  description: any ;
  deleted: any ;
  title = '';
  ngOnInit(): void {
    this.findAllPostes();
  }
findAllPostes() {
  this.service.findAllPostes().subscribe(resultat => {
    this.data = resultat;
  });
}
openModal(post: any) {
  this.title = 'Nouvelle';
  this.matDialog.open(post, {
    width: '800px',
    disableClose: true
  });
}
chooseAction(event: any, post: any, postDelete: any) {
  switch (event.action) {
    case 'delete' :
      this.id_post = event.data.id_post;
      this.matDialog.open(postDelete, {disableClose: true});
      break;
    default :
      event.action === 'edit' ? this.id_post = event.data.id_post : this.id_post = null;
      this.title = 'Modifier';
      this.fillDate(event.data);
      this.matDialog.open(post, {
        width: '800px',
        disableClose: true
      });
      break;
  }}
  addPostes(id_post) {
  const poste  = new Postes();
  poste .post_name = this.post_name;
  poste .description = this.description;
  poste.deleted = 0;
  if (this.id_post === null) {
    this.service.postPostes(poste).subscribe(() => {
      this.ngOnInit();
      this.close();
    });
  } else {
    poste.id = id_post;
    this.service.updatePostes(poste, id_post).subscribe(() => {
      this.ngOnInit();
      this.close();
    });
  }
}
deletePostes() {
  this.service.deletePostes(this.id_post).subscribe(r => {
    this.ngOnInit();
    this.close();
  } );
}
close() {
  this.post_name = null;
  this.id_post = null;
  this.description = null;
  this.matDialog.closeAll();
}

private fillDate(data) {
  this.post_name = data.post_name;
  this.description = data.description;
}

}
