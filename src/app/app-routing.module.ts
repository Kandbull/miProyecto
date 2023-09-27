import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'restablecer',
    loadChildren: () => import('./pages/restablecer/restablecer.module').then( m => m.RestablecerPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./tabs/settings/settings.module').then( m => m.SettingsPageModule)
  },
  /**{
    path: '**',
    loadChildren: () => import('./pages/notfound/notfound.module').then( m => m.NotfoundPageModule)
  },**/
  {
    path: 'camera',
    loadChildren: () => import('./tabs/camera/camera.module').then( m => m.CameraPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./tabs/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'galeria',
    loadChildren: () => import('./tabs/galeria/galeria.module').then( m => m.GaleriaPageModule)
  },
  {
    path: 'registrar',
    loadChildren: () => import('./pages/registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
