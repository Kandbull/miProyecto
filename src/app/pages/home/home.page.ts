import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseAuthService } from 'src/app/services/firebaseAuth/firebase-auth.service';
//import { MenuComponent } from 'src/app/components/menu/menu.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  constructor(
	private router: Router,
    public alertController: AlertController,
	public firebaseAuthService: FirebaseAuthService
    ) {
    
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
