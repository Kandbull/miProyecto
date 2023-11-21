import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastOptions } from '@ionic/angular';
import { DbserviceService } from 'src/app/services/offline/dbservice/dbservice.service';
import { Usuario } from 'src/app/interfaces/interface'; 
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { FirebaseAuthService } from 'src/app/services/firebaseAuth/firebase-auth.service';



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
    username: '',
    listaPersonaje: []
  };

  private path = '/usuario';

  loading: any;

  constructor(private dbservice: DbserviceService, 
      private router: Router,
      public firebase: FirebaseService,
      public loadingController: LoadingController,
      private authService: FirebaseAuthService
      ) 
      { }
  

  /***guardarUsuario(){
    this.dbservice.addUsuario(this.correoRegistro, this.usuarioRegistro, this.passwordRegistro);
    this.dbservice.presentToast("Usuario Registrado");
    this.router.navigate(['/login']);
  }*/
  /** 
  async setUserInfo(uid: string){
    if(this.form.valid){

    }
  }*/

  registro(email: string, password: string){
    this.authService.crearUsuario(this.correoRegistro,this.passwordRegistro)
    .then((usuarioCredencial) => {
      const userId = usuarioCredencial.user?.uid;
      const userData = {
        nombre: this.usuarioRegistro,
        username: email,
        listaPersonaje: []
      };
      this.authService.guardarDatosUsuario(userId!, userData)
      .then(() => {
        console.log('Usuario registrado y datos guardados en Firestore');
      })
      .catch((error) => {
        console.error('Error al guardar datos en Firestore:', error);
      });
    })
    .catch((error) => {
      console.error('Error al registrar usuario:', error );
    });
  }




  /** 
   * Cosas que funcionan
   */

  comprobarRegistro(){
    if(this.newUsuario.username == "" ){
      this.dbservice.presentToast("Falta correo");
      return;
    }if(this.newUsuario.nombre == ""){
      this.dbservice.presentToast("Falta crear usuario");
      return;
    }else{
      //this.dbservice.addUsuario(this.correoRegistro, this.usuarioRegistro, this.passwordRegistro);
      this.guardarUsuario();
      this.dbservice.presentToast("Usuario Registrado");
      this.router.navigate(['/login']);
    }
  }

  guardarUsuario(){
    this.firebase.crearUsuario(this.newUsuario, this.path, this.newUsuario.id).then( res => {
      this.loading.dismiss()
    }).catch( error => {});
  }


  //this.correoRegistro == ""  || this.usuarioRegistro == "" || this.passwordRegistro == null)
  
  async presentLoading() {
		this.loading = await this.loadingController.create({
		  cssClass: 'my-custom-class',
		  message: 'Guardando...'
		});
		await this.loading.present();
	  //await loading.onDidDismiss();
		//console.log('Loading dismissed!');
	  }

  ngOnInit(){
  }

}
