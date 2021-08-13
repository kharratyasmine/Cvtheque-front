import {Component, Input, OnInit} from '@angular/core';
import {AvantagesService} from '../../services/avantages.service';
import {Avantage} from '../../model/Avantage';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-avantages',
  templateUrl: './avantages.component.html',
  styleUrls: ['./avantages.component.scss']
})
export class AvantagesComponent implements OnInit {
  @Input()
 avantage: any;
  @Input()
  candidature: any;

  constructor(private service: AvantagesService,  private matDialog: MatDialog, ) { }
  settings = {
    columns: {
      advantage_name: {
        title: 'Nom'
      },
      advantage_group: {
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
        {
          name: 'edit',
          title: '<i class="cil-pencil width: 300px"></i>  ',
        },
      ],
    },
  };
  data = [];
  advantage_name: any;
  advantage_group: any;
  idAdvantage = null;
  deleted: any;
  title = '';
  ngOnInit(): void {
    this.findAllAvantages();
  }
  findAllAvantages() {
    this.service.findAllAvantages().subscribe(resultat => {
      this.data = resultat;
    });
  }
  openModal(avant: any) {
    this.title = 'Nouvelle';
    this.matDialog.open(avant, {
      width: '800px',
      disableClose: true
    });
  }
  chooseAction(event: any, avant: any, avantDelete: any) {
  switch (event.action) {
    case 'delete' :
      this.idAdvantage = event.data.id_advantage;
      this.matDialog.open(avantDelete, {disableClose: true});
      break;
      default :
        event.action === 'edit' ? this.idAdvantage = event.data.id_advantage : this.idAdvantage = null;
        this.title = 'Modifier';
        this.fillDate(event.data);
        this.matDialog.open(avant, {
        width: '800px',
        disableClose: true
      });
      break;
  }}
  addAdvantage(idAdvantage) {
    const avantage  = new Avantage();
    avantage .advantage_name = this.advantage_name;
    avantage .advantage_group = this.advantage_group;
    avantage.deleted = 0;
    if (this.idAdvantage === null) {
      this.service.postAdvantage(avantage).subscribe(() => {
        this.ngOnInit();
        this.close();
      });
    } else {
      avantage.id = idAdvantage;
      this.service.updateAvantage(avantage, idAdvantage).subscribe(() => {
        this.ngOnInit();
        this.close();
      });
    }
  }
  deleteAvantage() {
    this.service.deleteAvantage(this.idAdvantage).subscribe(r => {
      this.ngOnInit();
      this.close();
     } );
  }
  close() {
    this.advantage_name = null;
    this.advantage_group = null;
    this.idAdvantage = null;
    this.matDialog.closeAll();
  }
  private fillDate(data) {
    this.advantage_name = data.advantage_name;
    this.advantage_group = data.advantage_group;
  }
}
