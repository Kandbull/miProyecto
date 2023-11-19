import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthService } from 'src/app/services/firebaseAuth/firebase-auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(
    private router: Router,
    public alertController: AlertController,
    public firebaseAuthService: FirebaseAuthService

  ) { }

  ngOnInit() {
  }

  async cerrarSesion() {
		const alert = await this.alertController.create({
			header: 'Atención',
			message: '¿Está seguro que desea cerrar sesión?',
			buttons: [
				{
					text: 'No',
					role: 'cancel',
					handler: (blah) => {},
				},
				{
					text: 'Si',
					handler: async () => {
						this.firebaseAuthService.logOut()
						this.router.navigate([''])
					},
				},
			],
		})

		await alert.present()
	}

}

