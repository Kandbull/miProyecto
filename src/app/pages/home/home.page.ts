import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonModal, LoadingController, ModalController } from '@ionic/angular';
import { orderBy } from 'firebase/firestore';
import { Personaje, Usuario } from 'src/app/interfaces/interface';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
//import { ApiService } from 'src/app/services/api/api.service';
import { FirebaseAuthService } from 'src/app/services/firebaseAuth/firebase-auth.service';
import { InteractionsService } from 'src/app/services/interactions/interactions.service';
import { share } from 'rxjs';


@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {

	login: boolean = false
	@Input() usuario!: Usuario
	@Input() loaded!: boolean

	user(): Usuario {
		return this.interactions.getFromLocalStorage('user');
	}

	personajes: Personaje[] = []

	newPersonaje: Personaje = {
		id: this.firebase.getId(),
		nombre: '',
		edad: undefined,
		descripcion: ''
	}
	enableNewPersonaje = false;


	data: any;

	loading: any;

	private pathi = '/usuarios';


	private pathp = 'personaje/';


	constructor(
		private activateRoute: ActivatedRoute,
		private router: Router,
		public alertController: AlertController,
		public firebaseAuthService: FirebaseAuthService,
		public firebase: FirebaseService,
		private modalCtrl: ModalController,
		public interactions: InteractionsService,
		public loadingController: LoadingController
	) {
		this.firebaseAuthService.stateUser().subscribe((respuesta) => {
			if (respuesta) {
				console.log('Esta logueado')
				this.login = true
				this.getDatosUsuario(respuesta.uid)
				//this.data = this.router.getCurrentNavigation()?.extras.state?.["user"];
				console.log(this.data)
				console.log(this.getDatosUsuario);

			} else {
				console.log('no esta logueado')
				this.router.navigate([''])
				this.login = false
			}
		})
		/**
		this.activateRoute.queryParams.subscribe(params =>{//utilizo lambda
			if (this.router.getCurrentNavigation()?.extras.state) {
			  this.data = this.router.getCurrentNavigation()?.extras.state?.["user"];
			  console.log(this.data)
			}else{
			  this.router.navigate(["/login"]);
			}
		  }); */

	}

	ngOnInit() {
		
		this.leerPersonajes();
		this.getPersonajes();
	}

	/** Usuarios 
	 */



	getDatosUsuario(uid: string) {
		const path = 'usuarios'
		const id = uid
		this.firebase.getDocument<Usuario>(path, id).subscribe((respuesta) => {
			if (respuesta) {
				this.usuario = respuesta

			}
			this.loaded = true
			console.log('datos usuario -> ', respuesta)
		})
	}

	// Compartir texto
	compartir(){
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


	/** Personajes y creacion de los mismos */

	cancel() {
		return this.modalCtrl.dismiss(null, 'cancel');
	}



	guardarPersonaje() {
		

		this.firebase.createPersonaje(this.newPersonaje, this.pathp,
			this.newPersonaje.id).then(res => {

				this.loading.dismiss()
			}).catch(error => { });
		this.interactions.presentLoading('Creando Personaje...')
		return this.modalCtrl.dismiss();
	}

	nuevoPersonaje() {
		this.enableNewPersonaje = true;
		this.newPersonaje = {
			id: this.firebase.getId(),
			nombre: '',
			edad: undefined,
			descripcion: ''
		}
	}
	
	leerPersonajes(){
		this.firebase.getListPersonaje<Personaje>(this.pathp).subscribe( res => {
			this.personajes = res;
		})
	}

	deletePersonaje(personaje: Personaje){
		this.firebase.deleteDocPersonaje(this.pathp, personaje.id!);

	  }

	getPersonajes() {
		let path = `usuario/${this.user().id}/personajes`

		this.loading = true;

		let query = [
			orderBy('nombre', 'desc',)
		]

		let sub = this.firebase.getCollectionData(path, query).subscribe({
			next: (res: any) => {
				console.log(res);
				this.personajes = res;

				this.loading = false;
				sub.unsubscribe();
			}
		})
	}



	async presentLoading() {
		this.loading = await this.loadingController.create({
			cssClass: 'my-custom-class',
			message: 'Guardando...'
		});
		await this.loading.present();

	}




}
