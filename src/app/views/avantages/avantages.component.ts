import { Component, OnInit } from '@angular/core';
import {AvantagesService} from '../../services/avantages.service';
import {Avantage} from '../../model/Avantage';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-avantages',
  templateUrl: './avantages.component.html',
  styleUrls: ['./avantages.component.scss']
})
export class AvantagesComponent implements OnInit {

  constructor(private service: AvantagesService,  private matDialog: MatDialog,) { }
  settings = {
    columns: {
      competence_name: {
        title: 'Nom'
      },
      competence_group: {
        title: 'group'
      },
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [{
          name: 'delete',
          title: '<i class="icon-trash width: 300px"></i> ',
        },
      ],
    },
  };
  data = [];
  advantage_name : any;
  advantage_group : any;
  ngOnInit(): void {
    this.findAllAvantages();
  }
  findAllAvantages() {
    this.service.findAllAvantages().subscribe(resultat => {
      this.data = resultat;
    });
  }

  openModal(avant: any) {
    this.matDialog.open(avant, {
      width: '800px'
    });
  }
  chooseAction(event: any, avant: any, avantDelete: any) {
  switch (event.action) {
    case 'delete' :
      this.matDialog.open(avantDelete);
      break;
      default :
      this.matDialog.open(avant, {
        width: '800px'
      });
      break;
  }}
  addAvantage() {
    const avantage  = new Avantage();
    avantage .advantage_name = this.advantage_name;
    avantage .advantage_group = this.advantage_group;
    console.log(avantage );
    this.service.postAvantage (avantage ).subscribe(r => {
      console.log(r);
    });
  }
  deleteAvantage() {
  }

}
