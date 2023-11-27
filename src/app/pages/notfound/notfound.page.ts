import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseAuthService } from 'src/app/services/firebaseAuth/firebase-auth.service';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.page.html',
  styleUrls: ['./notfound.page.scss'],
})
export class NotfoundPage implements OnInit {

  constructor(
    private firebaseAuthService: FirebaseAuthService,
    private alertController: AlertController,
    private router: Router
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
					handler: (blah) => { },
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
