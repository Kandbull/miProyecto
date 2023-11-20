import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Personaje } from 'src/app/interfaces/interface';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
//import { ApiService } from 'src/app/services/api/api.service';
import { FirebaseAuthService } from 'src/app/services/firebaseAuth/firebase-auth.service';


@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {

	data: any;

	personajes: Personaje[]= [];

	private path = '/personaje';

	constructor(
		private router: Router,
		public alertController: AlertController,
		public firebaseAuthService: FirebaseAuthService,
		//private apiService: ApiService
		public firebase: FirebaseService
	) { }

	//ngOnInit() {
	//this.loadData();
	//}
	/** 
	loadData(){
		this.apiService.getData().subscribe((result) => {
			this.data = result;
		})
	}
	*/

	getPersonajes(){
		this.firebase.getListPersonaje<Personaje>(this.path).subscribe( res => {
			this.personajes = res;
		})
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
