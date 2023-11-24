import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { DbserviceService } from 'src/app/services/offline/dbservice/dbservice.service';
import { LoginserviceService } from 'src/app/services/login/loginservice.service';
import { Personaje, Usuario } from 'src/app/interfaces/interface'; 
import { InteractionsService } from 'src/app/services/interactions/interactions.service';
import { FirebaseAuthService } from 'src/app/services/firebaseAuth/firebase-auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  //imports: [MatProgressBarModule],
})
//export class ProgressBarIndeterminateExample {}

export class LoginPage implements OnInit {

  /**
   * Se genera el modelo user con dos claves
   * cada clave tiene su valor inicial
   */
  user={
    usuario:"",
    password:''
    
  }

  usuario: Usuario = {
    id: '',
    nombre: '',
    username: '',
    
  }

  personajes: Personaje[] = []

  // Branch Principal
  
  usuarioLogin= "";
  passwordLogin= "";

   newUsuario: Usuario = {
    id: this.firebase.getId(),
    nombre: '',
    username: ''

  };

  usuarios = []

  //private path = '/usuario';

  private pathi = '/usuarios';

  //usuarios:any;

  loading: any;

  greenflag: string="";
  constructor(private router: Router,
              public toastController: ToastController,
              //private loginservice: LoginserviceService,
              private dbservice: DbserviceService,
              private firebase: FirebaseService,
              public loadingController: LoadingController,
              public firebaseAuthService: FirebaseAuthService,
		          public interactions: InteractionsService,
              private firestore: AngularFirestore
              ) 
              {// this.getUsuariostList();
              }

  ngOnInit() {
    /** 
    this.loginservice.getUsers().subscribe((respuesta) => {
      Object.values(respuesta).forEach((usuarioApi) => {
        this.usuarios.push(...usuarioApi)
        console.log(this.usuarios)
      })
    })*/
  }

  iniciarSesion() {
		this.firebaseAuthService.iniciarSesion(this.usuarioLogin, this.passwordLogin)
		  .then((usuario) => {
			console.log('Inicio de sesión exitoso:', this.usuarioLogin);
			// Redirecciona a la página principal o realiza otras acciones necesarias.
      
		  })

		  .catch((error) => {
			console.error('Error al iniciar sesión:', error);
		  });
      
	  }

    
  getData(){
    this.firestore.collection('usuario').valueChanges().subscribe((data) =>{
      console.log('Datos de Firestore: ', data);
    })
  }

  async ingresar() {
		await this.interactions.presentLoading('Ingresando')
		const res = await this.firebaseAuthService
			.logIn(this.usuario.username, this.passwordLogin)
      /** 
      .then(repuesta => {
        this.getUserInfo(repuesta.user!.uid)
      })*/
			.catch((error) => {
				this.loginErrorsValidator(error)
			})
		if (res) {
			console.log('res ->', res)
			this.interactions.closeLoading()
			this.interactions.presentToast('Ingresado con exito '+ this.usuario.username)
      //this.firebase.crearUsuario(this.newUsuario, this.pathi, this.newUsuario.id)
      const resp = await this.firebaseAuthService
			.logIn(this.usuario.username, this.passwordLogin)
      .then(repuesta => {
        this.getUserInfo(repuesta.user!.uid)
      })
      
      this.firebase.getUsuario(this.pathi, this.usuario.username)
      console.log(this.usuario, ' ', this.usuario.id)
      console.log(this.firebaseAuthService.getUID, 'este es el uid de fireAuth')
      this.firebaseAuthService.leerUsuarioActual();
      /** 
      let navigationextras: NavigationExtras={
        state:{
          user: this.newUsuario, //Al state le asigno un objeto con clave valor
        }}*/
			this.router.navigate(['/home'])
		}
	}

   getUserInfo(uid: string){
      let path = `usuarios/${uid}`;
      this.firebase.getDocumento(path);
  }

	loginErrorsValidator(error: any): Promise<void> {
		if (error.code === 'auth/invalid-email') {
			return this.interactions.presentToast('Correo invalido')
		} else if (error.code === 'auth/user-not-found') {
			return this.interactions.presentToast('Correo no encontrado')
		} else if (error.code === 'auth/network-request-failed') {
			this.interactions.closeLoading()
			return this.interactions.showAlertSimple({
				header: 'Problemas de conexión',
				subHeader:
					'Tu teléfono ha perdido conexión, contáctese con su proveedor',
				message: '',
				buttons: ['Aceptar'],
			})
		} else {
			this.interactions.closeLoading()
			return this.interactions.presentToast('Usuario o Contraseña incorrecta')
		}
	}


  // este ingreso que estoy usando ahora mismo
  ingresoValido(){
    if(this.usuarioLogin == ""){
      this.dbservice.presentToast("Falta Usuario");
      return;
    }if(this.passwordLogin == ""){
      this.dbservice.presentToast("Falta Contraseña");
      return;
    }else{
      //this.loginservice.getUsuario(this.usuarioLogin, this.passwordLogin);
      //this.firebase.getUsuario(this.path, this.usuarioLogin);
      this.dbservice.presentToast("Sesion Iniciada correctamente");
      //console.log(this.nam);
      this.router.navigate(['/home']);
      
    }
  }


  
}