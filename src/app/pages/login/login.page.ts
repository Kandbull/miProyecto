import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { DbserviceService } from 'src/app/services/offline/dbservice/dbservice.service';
//import { LoginserviceService } from 'src/app/services/login/loginservice.service';
import { Usuario } from 'src/app/interfaces/registro';
import { InteractionsService } from 'src/app/services/interactions/interactions.service';
import { FirebaseAuthService } from 'src/app/services/firebaseAuth/firebase-auth.service';

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

  // Branch Principal
  
  usuarioLogin= "";
  passwordLogin= "";

  newUsuario: Usuario = {
    id: this.firebase.getId(),
    nombre: '',
    username: "",
    password: 0
  };

  private path = '/usuario';

  usuarios:any;

  loading: any;

  greenflag: string="";
  constructor(private router: Router,
              public toastController: ToastController,
              //private loginservice: LoginserviceService,
              private dbservice: DbserviceService,
              private firebase: FirebaseService,
              public loadingController: LoadingController,
              public firebaseAuthService: FirebaseAuthService,
		          public interactions: InteractionsService
              ) 
              {// this.getUsuariostList();
              }

  ngOnInit() {
    /***this.loginservice.getUsuarios().subscribe((resp) => {
      Object.values(resp).forEach((usuario) => {
        this.usuarios.push(...usuario)
        console.log(this.usuarios)
      })
    })*/
  }

  async ingresar() {
		await this.interactions.presentLoading('Ingresando')
		const res = await this.firebaseAuthService
			.logIn(this.usuarioLogin, this.passwordLogin)
			.catch((error) => {
				this.loginErrorsValidator(error)
			})
		if (res) {
			console.log('res ->', res)
			this.interactions.closeLoading()
			this.interactions.presentToast('Ingresado con exito')
			this.router.navigate(['/home'])
		}
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