import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Device } from '@capacitor/device'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials !: FormGroup;

  constructor(
    private formBuilder : FormBuilder,
    private authService : AuthService,
    private router : Router,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }

  get email (){
    return this.credentials.get('email');
  }

  get password (){
    return this.credentials.get('password');
  }

  ngOnInit() {
    this.credentials = this.formBuilder.group({
      email : ['',[Validators.required,Validators.email]],
      password : ['',[Validators.required,Validators.minLength(6)]]
    })
  }

  async register () {
    const user = await this.authService.register(this.credentials.value);

    if (user){
      console.log("OK");
      await this.presentConfirmation();
    }else{
      console.log("NOT OK");
      this.presentErrorAlert('Credenciales incorrectas', 'O correo en uso');
    }
  }



  passwordRecover(){
    this.router.navigate(['/password-recover']);
  }
  
  async login() {
    // Verifica si el usuario ha ingresado credenciales válidas en el formulario
    if (this.credentials.valid) {
      // Intenta iniciar sesión con las credenciales ingresadas
      const user = await this.authService.login(this.credentials.value);
      if (user) {
        // El inicio de sesión fue exitoso, realiza la lógica apropiada
        console.log("OK");
        this.presentLoader();
      } else {
        // El inicio de sesión falló, muestra un mensaje de error
        console.log("NOT OK");
        this.presentErrorAlert('Inicio de sesión fallido', 'Usuario no encontrado o contraseña incorrecta.');
      }
    } else {
      // Las credenciales ingresadas no son válidas, muestra un mensaje de error
      this.presentErrorAlert('Credenciales incorrectas', 'Verifica tus datos.');
    }
  }
  


 async presentConfirmation() {
  const alert = await this.alertController.create({
    header: 'Registro exitoso',
    message: 'Tu registro se ha completado correctamente.',
    buttons: [
      {
        text: 'OK',
        handler: () => {
          this.router.navigate(['/principal']);
        }
      }
    ]
  });

  await alert.present();
}

 //Loader del login
 async presentLoader() {
  const loading = await this.loadingController.create({
    message: 'Iniciando sesión...', 
    duration: 2000
  });

  await loading.present();

  loading.onDidDismiss().then(() => {
      this.router.navigate(['/principal']);
    });
  }

  async presentErrorAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}


//Plugin device - falta completar pa que funcione

const logDeviceInfo = async () => {
  const info = await Device.getInfo();

  console.log(info);
};

const logBatteryInfo = async () => {
  const info = await Device.getBatteryInfo();

  console.log(info);
};