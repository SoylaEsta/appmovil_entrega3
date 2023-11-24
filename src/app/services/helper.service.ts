import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class HelperService {
 

  constructor(private modalController:ModalController) { }



  async showModal(componente:any,props:any={},hideable = false){
    var modal = await this.modalController.create(
      {
        component:componente,
        cssClass:"modalClass",
        componentProps:props,
        backdropDismiss:hideable
      });
      await modal.present();
  }
}
