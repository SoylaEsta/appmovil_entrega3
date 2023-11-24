import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Device } from '@capacitor/device';
import { ToastController } from "@ionic/angular";
import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Geolocation } from "@capacitor/geolocation";

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  segment: string = 'principal';
  displayName: string = '';
  longitud: number | undefined;
  latitud: number | undefined;

  constructor(private navCtrl: NavController, private alertController: AlertController, private toastController: ToastController) {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        this.displayName = uid;
      }
    });
  }

  async logDeviceInfo() {
    const info = await Device.getInfo();
    console.log(info);
  }

  async logBatteryInfo() {
    const info = await Device.getBatteryInfo();
    console.log(info);
  }

  ngOnInit() {
    this.mostrarMensajeYBateria();
    this.obtenerUbicacion();
  }

  vehicle() {
    this.navCtrl.navigateRoot('/vehiculo');
  }

  async confirmLogout() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión',
      message: '¿Estás seguro de que deseas cerrar la sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Cerrar Sesión',
          handler: () => {
            this.logout();
          },
        },
      ],
    });

    await alert.present();
  }

  async logout() {
    try {
      const auth = getAuth();
      await signOut(auth);
      this.navCtrl.navigateRoot('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  async mostrarToast(mensaje: string, duracion: number = 3000) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: duracion
    });
    toast.present();
  }

  async mostrarMensajeYBateria() {
    try {
      const batteryInfo: any = await Device.getBatteryInfo(); // Usar 'any' para evitar problemas de tipos
      const batteryPercentage = batteryInfo.percent;
      const mensaje = `El porcentaje de la batería es: ${batteryPercentage}%`;
      await this.mostrarToast(mensaje);
    } catch (error) {
      console.error('Error al obtener la información de la batería:', error);
    }
  }

  async obtenerUbicacion() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.latitud = coordinates.coords.latitude;
    this.longitud = coordinates.coords.longitude;
  }

}
