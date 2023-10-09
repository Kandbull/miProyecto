import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  correoRegistro = "";
  usuarioRegistro = "";
  passwordRegistro = "";

  constructor(private dbservice: DbserviceService, private router: Router) { }

  guardarUsuario(){
    this.dbservice.addUsuario(this.correoRegistro, this.usuarioRegistro, this.passwordRegistro);
    this.dbservice.presentToast("Usuario Agregado");
    this.router.navigate(['/login']);
  }


  ngOnInit() {
  }

}
