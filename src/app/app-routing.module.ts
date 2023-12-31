import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { WardGuard } from './ward/ward.guard';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo([''])
const redirectLoggedInToHome = () => redirectLoggedInTo(['home'])
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [AngularFireAuthGuard],
		data: { authGuardPipe: redirectLoggedInToHome }
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AngularFireAuthGuard],
		data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'restablecer',
    loadChildren: () => import('./pages/restablecer/restablecer.module').then( m => m.RestablecerPageModule)
  },
  
  {
    path: 'randomizer',
    loadChildren: () => import('./pages/randomizer/randomizer.module').then( m => m.RandomizerPageModule),
    canActivate: [AngularFireAuthGuard],
		data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule),
    canActivate: [AngularFireAuthGuard],
		data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'registrar',
    loadChildren: () => import('./pages/registrar/registrar.module').then( m => m.RegistrarPageModule)
  },

  {
    path: 'share',
    loadChildren: () => import('./pages/share/share.module').then( m => m.SharePageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/notfound/notfound.module').then( m => m.NotfoundPageModule),
    canActivate: [AngularFireAuthGuard],
		data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
