import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WithdrawalLogPage } from './withdrawal-log';

@NgModule({
  declarations: [
    WithdrawalLogPage,
  ],
  imports: [
    IonicPageModule.forChild(WithdrawalLogPage),
  ],
})
export class WithdrawalLogPageModule {}
