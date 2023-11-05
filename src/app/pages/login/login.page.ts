import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { DbserviceService } from 'src/app/services/offline/dbservice/dbservice.service';
//import { LoginserviceService } from 'src/app/services/login/loginservice.service';


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

  usuarios:any;

  loading: any;

  greenflag: string="";
  constructor(private router: Router,
              public toastController: ToastController,
              //private loginservice: LoginserviceService,
              private dbservice: DbserviceService,
              public loadingController: LoadingController) 
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
  /**
   * 
   
  getUsuariostList() {
    this.loginservice.getUsersList().subscribe((data) => {
      console.log(data);
      this.usuarios = data;
    });
  }*/




  ingresar(){
    console.log(this.user)
    if (this.validateModel(this.user)) {
      this.presentToast("top", "Bienvenido "+this.user.usuario);
      //this.isLoading = true;
      this.setOpen;
      // Los navigationExtras es la declaracion e instancia de un elemento
      // o parametro, para la otra página
      let navigationextras: NavigationExtras={
        state:{
          user: this.user //Al state le asigno un objeto con clave valor, lo vere despues
        }
      }
      this.router.navigate(['/home'],navigationextras);
    }else{
      this.presentToast("bottom","Falta "+this.greenflag,4000);
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
      this.dbservice.presentToast("Sesion Iniciada correctamente");
      this.router.navigate(['/home']);
    }
  }

  /** 
   this.dbservice.verificarUsuario(this.usuarioLogin);
    this.dbservice.presentToast("Sesion Iniciada correctamente");
    this.router.navigate(['/home']);
   
  */
  



  // intento de hacer un alert con forma de loading
  isAlertOpen = false;
  

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }


  validateModel(model:any){
    // Recorro todas las entradas que me entrega Object entries y obtengo su clave, valor
    // dejar esto como guía voy a ver como va funcionando
    for(var[key,value] of Object.entries(model)){
      // Si un valor es "" se retornara false y se avisara de lo faltante
      if(value==""){
        this.greenflag=key;
        return false;
      }      
    }
    return true;
  }

  // Intento de validar usuario 1 - investigar para despues si puede funcionar

  //validarUsuario(user: string, pass: number){
   // this.buscaUsuario = this.user.usuario == user;
   // if (typeof this.user.usuario == 'undefined'){
     // this.presentToast('Usuario invalido', 800)
    //  return false
   // }
   // if(typeof this.user.password == 'undefined'){
    //  this.presentToast('Contraseña invalida', 800)
     // return false
    //}
    //return true
  //}


    /**
   * Muestra un toast al usuario
   * @param position Posición dónde se mostrará el mensaje
   * @param message Mensaje a presentar al usuario
   * @param duration Duración el toast, este es opcional
   */
    async presentToast(position: 'top' | 'middle' | 'bottom',
    message: string,
    duration?: number) {
  const toast = await this.toastController.create({
  message: message,
  duration: duration?duration:2000,
  position: position,
  });
  await toast.present();
  }


  async presentLoading() {
		this.loading = await this.loadingController.create({
		  cssClass: 'my-custom-class',
		  message: 'Guardando...'
		});
		await this.loading.present();
	  //await loading.onDidDismiss();
		//console.log('Loading dismissed!');
	  }




}