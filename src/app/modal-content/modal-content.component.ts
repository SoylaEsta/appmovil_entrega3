import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss'],
})
export class ModalContentComponent  implements OnInit {

  constructor(private modalController:ModalController) { }

  ngOnInit() {}

  close(){
    this.modalController
    .dismiss();
    }
    } 
