import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonModal, LoadingController, ModalController} from '@ionic/angular';
import { Personaje, Usuario } from 'src/app/interfaces/interface';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
//import { ApiService } from 'src/app/services/api/api.service';
import { FirebaseAuthService } from 'src/app/services/firebaseAuth/firebase-auth.service';
import { InteractionsService } from 'src/app/services/interactions/interactions.service';


@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {

	login: boolean = false
	@Input() usuario!: Usuario
	@Input() loaded!: boolean

	usuario1!: Usuario

	newPersonaje: Personaje = {
		id: this.firebase.getId(),
		nombre: '',
		edad: undefined,
		descripcion: ''
	  }
	  enableNewPersonaje = false;
	

	data: any;

	personajes: Personaje[]= [];

	loading: any;

  private path = '/usuario/personaje';

	constructor(
		private router: Router,
		public alertController: AlertController,
		public firebaseAuthService: FirebaseAuthService,
		public firebase: FirebaseService,
		private modalCtrl: ModalController,
		public interactions: InteractionsService,
		public loadingController: LoadingController
	) {
		this.firebaseAuthService.stateUser().subscribe((respuesta) => {
			if (respuesta){
				console.log('Esta logueado')
				this.login = true
				this.getDatosUsuario(respuesta.uid)

			} else {
				console.log('no esta logueado')
				this.router.navigate([''])
				this.login = false
			}
		}) 
		
	}

	ngOnInit() {
	}

	/** Usuarios 
	 */

	getDatosUsuario(uid: string) {
		const path = 'usuario'
		const id = uid
		this.firebase.getDocument<Usuario>(path, id).subscribe((respuesta) => {
			if (respuesta) {
				this.usuario = respuesta
				
			}
			this.loaded = true
			console.log('datos usuario -> ', respuesta)
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


	/** Personajes y creacion de los mismos */

	cancel() {
		return this.modalCtrl.dismiss(null, 'cancel');
	  }



	guardarPersonaje(){
		this.firebase.createPersonaje(this.newPersonaje, this.path, 
		  this.newPersonaje.id).then( res => {
			
			this.loading.dismiss()
		  }).catch( error => {});
		  this.interactions.presentLoading('Creando Personaje...')
		  return this.modalCtrl.dismiss();
	  }
	
	  nuevoPersonaje(){
		this.enableNewPersonaje = true;
		this.newPersonaje = {
		  id: this.firebase.getId(),
		  nombre: '',
		  edad: undefined,
		  descripcion: ''
		}
	  }

	getPersonajes(){
		this.firebase.getListPersonaje<Personaje>(this.path).subscribe( res => {
			this.personajes = res;
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
