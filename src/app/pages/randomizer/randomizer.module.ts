import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RandomizerPageRoutingModule } from './randomizer-routing.module';

import { RandomizerPage } from './randomizer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RandomizerPageRoutingModule
  ],
  declarations: [RandomizerPage]
})
export class RandomizerPageModule {}
