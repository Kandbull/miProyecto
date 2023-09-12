import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { AlarmaComponent } from '../components/alarma/alarma.component';
import { NotificacionComponent } from '../components/notificacion/notificacion.component';
import { CalendarioComponent } from '../components/calendario/calendario.component';
import { MovilidadComponent } from '../components/movilidad/movilidad.component';
import { AjustesComponent } from '../components/ajustes/ajustes.component';


const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path:'alarma',
        component: AlarmaComponent
      },
      {
        path:'alarma',
        loadChildren: () => import('src/app/tabs/alarma/alarma-routing.module').then( m => m.AlarmaPageRoutingModule)
        
      },
      {
        path: 'notificacion',
        component: NotificacionComponent
      },
      {
        path: 'calendario',
        component: CalendarioComponent
      },
      {
        path: 'movilidad',
        component: MovilidadComponent
      },
      {
        path: 'ajustes',
        component: AjustesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}





/**
 * {
        path:'alarma',
        loadChildren: () => import('src/app/tabs/alarma/alarma-routing.module').then( m => m.AlarmaPageRoutingModule)
      },
      {
        path:'',
        redirectTo: '/tabs/alarma',
        pathMatch: 'full'
      }
    ]
  },
  {
    path:'',
    redirectTo: '/tabs/alarma',
    pathMatch: 'full'
  }
 */