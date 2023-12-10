import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interface';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { FirebaseAuthService } from 'src/app/services/firebaseAuth/firebase-auth.service';
import { InteractionsService } from 'src/app/services/interactions/interactions.service';



@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})

export class RegistrarPage implements OnInit {

  correoRegistro = '';
  usuarioRegistro = '';
  passwordRegistro = '';


  newUsuario: Usuario = {
    id: this.firebase.getId(),
    nombre: '',
    username: ''
  };

  private path = '/usuario';

  loading: any;

  constructor(
    private router: Router,
    public firebase: FirebaseService,
    public loadingController: LoadingController,
    private authService: FirebaseAuthService,
    private interactions: InteractionsService
  ) { }
  ngOnInit() { }


  registro() {

    const respuesta = this.authService.crearUsuario(this.correoRegistro, this.passwordRegistro)
      .then((usuarioCredencial) => {
        const userId = usuarioCredencial.user?.uid;
        const userData = {
          nombre: this.usuarioRegistro,
          username: this.correoRegistro
        };
        this.authService.guardarDatosUsuario(userId!, userData)
          .then(() => {
            console.log('Usuario registrado y datos guardados en Firestore');
            this.interactions.closeLoading()
            this.interactions.presentToast('Registrado con exito')
          })
          .catch((error) => {
            console.error('Error al guardar datos en Firestore:', error);
          });
      })
      .catch((error) => {
        console.error('Error al registrar usuario:', error);
      })
      if (respuesta){
        console.log('Respuesta -> ', respuesta)
        this.interactions.closeLoading()
        this.interactions.presentToast('Registrado con exito')
      }

      // Pongo que tire al login, pero esto pezca como si ya estuviera logueado
      this.router.navigate(['/login'])
  }




  /** 
   * Cosas que funcionan
   */

  guardarUsuario() {
    this.firebase.crearUsuario(this.newUsuario, this.path, this.newUsuario.id).then(res => {
      this.loading.dismiss()
    }).catch(error => { });
  }


  //this.correoRegistro == ""  || this.usuarioRegistro == "" || this.passwordRegistro == null)

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Guardando...'
    });
    await this.loading.present();
  }


}
