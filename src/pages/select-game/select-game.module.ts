import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectGamePage } from './select-game';

@NgModule({
  declarations: [
    SelectGamePage,
  ],
  imports: [
    IonicPageModule.forChild(SelectGamePage),
  ],
})
export class SelectGamePageModule {}
