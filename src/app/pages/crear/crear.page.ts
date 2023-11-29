import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Personaje, Usuario } from 'src/app/interfaces/interface';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { InteractionsService } from 'src/app/services/interactions/interactions.service';
//import { ApiService } from 'src/app/services/api/api.service';



@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {


  

  newPersonaje: Personaje = {
    id: this.firebase.getId(),
    nombre: '',
    edad: undefined,
    descripcion: '',
    tPersonajeFunc: '',
			tPersonajeRol: ''
  }
  enableNewPersonaje = false;

  
  enablenewUsuario = false;

  loading: any;

  private path = '/personaje';

  private pathu = '/usuario';

  constructor(
    public interactions: InteractionsService,
    private firebase: FirebaseService,
    public loadingController: LoadingController,
    private router: Router
  ) { }
  
  ngOnInit() {
    const router = this.router.getCurrentNavigation()?.extras.state
    
    }

  personajes:any;
  
  /** 
  guardarUsuario(){
    this.firebase.crearUsuario(this.newUsuario, this.pathu, this.newUsuario.id).then( res => {      
      this.loading.dismiss()
    }).catch( error => {});
  }
  */
  
  guardarPersonaje(){
    this.firebase.createPersonaje(this.newPersonaje, this.path, 
      this.newPersonaje.id).then( res => {
        
        this.loading.dismiss()
      }).catch( error => {});
      this.interactions.presentLoading('Creando Personaje...')
      this.router.navigate(['/home'])
  }

  nuevoPersonaje(){
    this.enableNewPersonaje = true;
    this.newPersonaje = {
      id: this.firebase.getId(),
      nombre: '',
      edad: undefined,
      descripcion: '',
      tPersonajeFunc: '',
			tPersonajeRol: ''
    }
  }

  async presentLoading() {
		this.loading = await this.loadingController.create({
		  cssClass: 'my-custom-class',
		  message: 'Guardando...'
		});
		await this.loading.present();
	  
	  }
 
  

}
