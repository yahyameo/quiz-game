import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckPaymentPage } from './check-payment';

@NgModule({
  declarations: [
    CheckPaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckPaymentPage),
  ],
})
export class CheckPaymentPageModule {}
