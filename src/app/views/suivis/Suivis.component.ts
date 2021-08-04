import {Component,  OnInit} from '@angular/core';
import {SuivisService} from '../../services/Suivis.service';
import {MatDialog} from '@angular/material/dialog';
import {Suivis} from '../../model/suivis';

@Component({
  selector: 'app-suivis',
  templateUrl: './Suivis.component.html',
  styleUrls: ['./Suivis.component.scss']
})
export class SuivisComponent implements OnInit {
  private suivis: any;
  constructor(private service: SuivisService, private matDialog: MatDialog) {
  }
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
  Description_Action: any;
  Avancement: any;
  date_input: any;
  ngOnInit(): void {
    this.findAllSuivis();
  }

  findAllSuivis() {
    this.service.findAllSuivis().subscribe(resultat => {
      console.log(resultat);
      this.data = resultat;
    });
  }

  openModal(element: any) {
    this.matDialog.open(element, {
      width: '800px'
    });
  }

  chooseAction(event: any, element: any, elementDelete: any) {
    switch (event.action) {
      case 'delete' :
        this.matDialog.open(elementDelete);
        break;
      default :
        this.matDialog.open(element);
        break;
    }
  }

  addSuivis() {
    const suivis = new Suivis();
    suivis.Description_Action = this.Description_Action;
    suivis.Avancement = this.Avancement;
    suivis.Date_Input = this.date_input;
    console.log(suivis);
    this.service.postSuivis(suivis).subscribe(r => {
      console.log(r);
    });
  }

  deleteSuivis() {
    this.service.deleteSuivis(this.suivis.id).subscribe(r => {
      console.log(this.suivis);
    });
  }
  close() {
    this.Description_Action = null;
    this.Avancement = null;
    this.date_input = null;
    this.matDialog.closeAll();
  }



}




