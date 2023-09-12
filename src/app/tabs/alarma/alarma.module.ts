import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlarmaPageRoutingModule } from './alarma-routing.module';

import { AlarmaPage } from './alarma.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlarmaPageRoutingModule
  ],
  declarations: [AlarmaPage]
})
export class AlarmaPageModule {}
