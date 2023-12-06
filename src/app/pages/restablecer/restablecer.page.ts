import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from 'src/app/services/firebaseAuth/firebase-auth.service';
import { InteractionsService } from 'src/app/services/interactions/interactions.service';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage implements OnInit {

  email =  '';

  constructor(
    private interaccion: InteractionsService,
    public firebaseAuth: FirebaseAuthService
  ) { }

  ngOnInit() {
  }

  recuperarPassword(){
    this.firebaseAuth.resetPassword(this.email)
    this.interaccion.showAlertSimple({
      header: '¡Correo enviado de forma exitosa!',
			subHeader: 'Revisa tu correo electronico',
			message: '___________________________',
			buttons: ['ok'],
    })
  }

}
