import { Component } from '@angular/core';
import { Router } from '@angular/router';
//import { MenuComponent } from 'src/app/components/menu/menu.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  constructor(private router: Router,
    //private menuSide: MenuComponent
    ) {
    
  }
}
