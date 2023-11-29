import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RandomizerPage } from './randomizer.page';

const routes: Routes = [
  {
    path: '',
    component: RandomizerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RandomizerPageRoutingModule {}
