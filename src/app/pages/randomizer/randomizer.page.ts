import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseAuthService } from 'src/app/services/firebaseAuth/firebase-auth.service';

@Component({
	selector: 'app-randomizer',
	templateUrl: './randomizer.page.html',
	styleUrls: ['./randomizer.page.scss'],
})
export class RandomizerPage implements OnInit {

	constructor(
		private alertController: AlertController,
		private firebaseAuthService: FirebaseAuthService,
		private router: Router
	) { }

	ngOnInit() {

	}

	recargarPagina() {
		window.location.reload();
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
