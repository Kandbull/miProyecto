import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthService } from 'src/app/services/firebaseAuth/firebase-auth.service';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { Usuario } from 'src/app/interfaces/interface';



@Component({
	selector: 'app-perfil',
	templateUrl: './perfil.page.html',
	styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
	login: boolean = false;

	@Input() usuario!: Usuario
	@Input() loaded!: boolean


	constructor(
		private router: Router,
		public alertController: AlertController,
		public firebaseAuthService: FirebaseAuthService,
		public firebase: FirebaseService

	) {

		this.firebaseAuthService.stateUser().subscribe((res) => {
			if (res) {
				console.log('esta logeado');
				this.login = true;
				this.getDatosUsuario(res.uid);
			} else {
				console.log('no esta logeado');
				this.router.navigate(['']);
				this.login = false;
			}
		});
	}

	async ngOnInit() {
	}

	getDatosUsuario(uid: string) {
		const path = 'usuario';
		const id = uid;
		this.firebase.getDocument<Usuario>(path, id).subscribe((respuesta) => {
			if (respuesta) {
				this.usuario = respuesta

			}
			this.loaded = true
			console.log('datos usuario -> ', respuesta)
		});

	}
	/**
	getDatosAlumno(uid: string) {
	  const path = 'usuario'
	  const id = uid
	  this.firebase.getDocument<Usuario>(path, id).subscribe((res) => {
		  if (res) {
			  this.usuario = res
		  }
		  this.loaded = true
		  console.log('datos alumno -> ', res)
	  })
  }*/
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
						this.firebaseAuthService.logOut();
						this.router.navigate(['']);
					},
				},
			],
		});

		await alert.present();
	}

}
