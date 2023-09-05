import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { CasaComponent } from '../componentes/casa/casa.component';
import { NotificacionComponent } from '../componentes/notificacion/notificacion.component';
import { CalendarioComponent } from '../componentes/calendario/calendario.component';
import { MovilidadComponent } from '../componentes/movilidad/movilidad.component';
import { AjustesComponent } from '../componentes/ajustes/ajustes.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path:'casa',
        component: CasaComponent
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
