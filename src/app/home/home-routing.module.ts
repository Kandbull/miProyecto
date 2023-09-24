import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { AlarmaComponent } from '../components/alarma/alarma.component';


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
        path:'camera',
        component: AlarmaComponent
        
      },
      {
        path:'perfil',
        component: AlarmaComponent
        
      },

      {
        path: 'settings',
        loadChildren: () => import('src/app/tabs/settings/settings-routing.module').then( m => m.SettingsPageRoutingModule)
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