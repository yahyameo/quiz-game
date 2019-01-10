import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoinsPage } from './coins';

@NgModule({
  declarations: [
    CoinsPage,
  ],
  imports: [
    IonicPageModule.forChild(CoinsPage),
  ],
})
export class CoinsPageModule {}
