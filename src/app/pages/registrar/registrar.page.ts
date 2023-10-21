import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastOptions } from '@ionic/angular';
import { DbserviceService } from 'src/app/services/dbservice/dbservice.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  correoRegistro = "";
  usuarioRegistro = "";
  passwordRegistro = null;

  constructor(private dbservice: DbserviceService, private router: Router) { }
  

  /***guardarUsuario(){
    this.dbservice.addUsuario(this.correoRegistro, this.usuarioRegistro, this.passwordRegistro);
    this.dbservice.presentToast("Usuario Registrado");
    this.router.navigate(['/login']);
  }*/

  comprobarRegistro(){
    if(this.correoRegistro == "" ){
      this.dbservice.presentToast("Falta correo");
      return;
    }if(this.usuarioRegistro == ""){
      this.dbservice.presentToast("Falta crear usuario");
      return;
    }if(this.passwordRegistro == null){
      this.dbservice.presentToast("Falta crear contraseña");
      return;
    }else{
      this.dbservice.addUsuario(this.correoRegistro, this.usuarioRegistro, this.passwordRegistro);
      this.dbservice.presentToast("Usuario Registrado");
      this.router.navigate(['/login']);
    }
  }

  //this.correoRegistro == ""  || this.usuarioRegistro == "" || this.passwordRegistro == null)


  ngOnInit(){
  }

}
