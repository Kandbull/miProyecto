import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastOptions } from '@ionic/angular';
import { DbserviceService } from 'src/app/services/offline/dbservice/dbservice.service';
import { Usuario } from 'src/app/interfaces/registro';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  correoRegistro = "";
  usuarioRegistro = "";
  passwordRegistro = null;


  newUsuario: Usuario = {
    id: this.firebase.getId(),
    nombre: '',
    username: '',
    password: 0
  };

  private path = '/usuario';

  loading: any;

  constructor(private dbservice: DbserviceService, 
      private router: Router,
      public firebase: FirebaseService,
      public loadingController: LoadingController) 
      { }
  

  /***guardarUsuario(){
    this.dbservice.addUsuario(this.correoRegistro, this.usuarioRegistro, this.passwordRegistro);
    this.dbservice.presentToast("Usuario Registrado");
    this.router.navigate(['/login']);
  }*/

  comprobarRegistro(){
    if(this.newUsuario.username == "" ){
      this.dbservice.presentToast("Falta correo");
      return;
    }if(this.newUsuario.nombre == ""){
      this.dbservice.presentToast("Falta crear usuario");
      return;
    }if(this.newUsuario.password == null){
      this.dbservice.presentToast("Falta crear contraseña");
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
