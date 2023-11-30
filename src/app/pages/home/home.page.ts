import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonModal, LoadingController, ModalController } from '@ionic/angular';
import { orderBy } from 'firebase/firestore';
import { Personaje, Usuario } from 'src/app/interfaces/interface';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

import { FirebaseAuthService } from 'src/app/services/firebaseAuth/firebase-auth.service';
import { InteractionsService } from 'src/app/services/interactions/interactions.service';
//import { Share, SharePlugin } from '@capacitor/share';
import { Share } from '@capacitor/share';
import { ApiService } from 'src/app/services/api/api.service';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';


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
		return this.interactions.getFromLocalStorage('user_uid');
	}

	personajes: Personaje[] = []

	newPersonaje: Personaje = {
		id: this.firebase.getId(),
		nombre: '',
		edad: undefined,
		genero: '',
		descripcion: '',
		tPersonajeFunc: '',
		tPersonajeRol: ''
	}
	enableNewPersonaje = false;

	updatePersonaje: Personaje = {
		id: '',
		nombre: '',
		edad: undefined,
		genero: '',
		descripcion: '',
		tPersonajeFunc: '',
		tPersonajeRol: ''
	}


	data: any;

	loading: any;

	private pathi = '/usuarios';


	//private pathe = 'personaje/';

	private pathe = `usuario/${this.user()}/personajes`;

	public sendEmail(e: Event) {
		e.preventDefault();
		emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target as HTMLFormElement, 'YOUR_PUBLIC_KEY')
			.then((result: EmailJSResponseStatus) => {
				console.log(result.text);
			}, (error) => {
				console.log(error.text);
			});
	}


	constructor(
		private activateRoute: ActivatedRoute,
		private router: Router,
		public alertController: AlertController,
		public firebaseAuthService: FirebaseAuthService,
		public firebase: FirebaseService,
		private modalCtrl: ModalController,
		public interactions: InteractionsService,
		public loadingController: LoadingController,
		//private apirandom: ApiService
		//private sharep: SharePlugin

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
		
		//this.getPersonajes();
		this.firebaseAuthService.getUID();
		console.log('Aqui debe ir el getUid:', this.firebaseAuthService.getUID());

	}

	randomizerPage(){
		this.router.navigate(['randomizer']);
	}

	/** Aqui se comparten cosas */
	shareApp(personaje: Personaje) {
		Share.share({
			title: 'Este es mi Personaje',
			text: `Nomnbre: ${personaje?.nombre}\n Edad: ${personaje?.edad}\n 
			Genero: ${personaje?.genero}\n Funcion Personaje: ${personaje?.tPersonajeFunc}\n
			Rol Personaje: ${personaje?.tPersonajeRol}\n Descripcion: ${personaje?.descripcion}`
		})
	}

	sharePagAyuda() {
		url: 'https://www.coollibri.es/blog/como-crear-un-personaje-ficticio-o-de-novela-en-5-pasos/'
	}

	enviarEmail() {
		//email
	}



	/** Usuarios 
	 */
	recargarPagina() {
		window.location.reload();
	}


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


	// Cerrar Sesion
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
						localStorage.removeItem('user_uid')
						this.router.navigate([''])
						window.location.reload();
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

		this.firebase.createPersonaje(this.newPersonaje, this.pathe,
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
			genero: '',
			descripcion: '',
			tPersonajeFunc: '',
			tPersonajeRol: ''
		}
	}

	leerPersonajes() {
		this.firebase.getListPersonaje<Personaje>(this.pathe).subscribe(res => {
			this.personajes = res;
		})
	}

	editarPersonaje(){
		let updatePersonaje = {

		}
		//this.firebase.updatePersonaje(this.updatePersonaje, this.pathe)
	}

	openEditar(personaje: Personaje){
		this.enableNewPersonaje = true;
		console.log('Aqui d')
	}

	deletePersonaje(personaje: Personaje) {
		this.firebase.deleteDocPersonaje(this.pathe, personaje.id!);

	}


	async presentLoading() {
		this.loading = await this.loadingController.create({
			cssClass: 'my-custom-class',
			message: 'Guardando...'
		});
		await this.loading.present();

	}




}
