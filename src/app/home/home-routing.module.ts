import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';


const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path:'alarma',
        loadChildren: () => import('src/app/tabs/alarma/alarma-routing.module').then( m => m.AlarmaPageRoutingModule)
        
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