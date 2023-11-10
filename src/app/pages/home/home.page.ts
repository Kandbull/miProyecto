import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
//import { MenuComponent } from 'src/app/components/menu/menu.component';
import { Personaje } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  constructor(private router: Router,
    private firebase: FirebaseService
    //private menuSide: MenuComponent
  ) {
  }
    
  private path = '/personaje';

  personajes: Personaje[]= [];


  getPersonajes(){
    this.firebase.getListaPersonaje<Personaje>(this.path).subscribe(
       respuesta => {this.personajes = respuesta;}
    );
  }
}
